import prisma from "@/src/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
export async function POST(req: NextRequest, { params }) {
  try {
    const cookieStore = cookies()
    const seen = cookieStore.get("seen")
    const formData: any = await req.json()

    const findDataAction = await prisma.post.findFirst({
      where: {
        id: formData?.postId,
      },
      include: {
        action: true,
      },
    })
    console.log("🚀 ~ file: route.ts:18 ~ POST ~ findDataAction:", findDataAction)
    if (findDataAction?.action === null) {
      await prisma.action.create({
        data: {
          ...(formData?.type ? { [formData?.type]: 1 } : {}),
          postId: formData?.postId,
        },
      })
    } else {
      await prisma.action.update({
        where: { id: findDataAction?.action?.id },
        data: {
          ...(formData?.type
            ? { [formData?.type]: findDataAction?.action[formData?.type] + 1 }
            : {}),
        },
      })
    }
    let newDataSeen = [formData?.postId]
    if (seen?.value) {
      const valueSeen = JSON.parse(seen.value)
      newDataSeen = [...new Set([...valueSeen, formData?.postId])]
    }

    return NextResponse.json(
      { data: findDataAction },
      {
        headers: {
          "Set-Cookie": `seen=${JSON.stringify(newDataSeen)}; SameSite=Lax;Path=/`,
        },
      }
    )
  } catch (error) {
    return console.log(error)
  }
}
