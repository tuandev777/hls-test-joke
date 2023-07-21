import { NextResponse, userAgent } from "next/server"
import prisma from "../../../lib/prisma"
import { type NextRequest } from "next/server"
export const dynamic = "force-dynamic"
export async function GET(req: NextRequest, { params }) {
  try {
    const seen = req.cookies.get("seen")
    const getDataSeen = seen?.value ? JSON.parse(seen?.value) : null
    const data = await prisma.post.findMany({
      take: 1,
      include: {
        locale: {
          where: {
            languageKey: req.headers.get("accept-language"),
          },
        },
      },
      ...(getDataSeen
        ? {
            where: {
              id: { notIn: getDataSeen },
            },
          }
        : {}),
    })
    return NextResponse.json({
      data,
    })
  } catch (error) {
    return console.log(error)
  }
}
