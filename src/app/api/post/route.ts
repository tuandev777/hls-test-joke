import prisma from "@/src/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export async function GET(req: NextRequest, { params }) {
  try {
    const { searchParams } = new URL(req.url)
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1

    const pageSize = searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 10

    const data = await prisma.$transaction([
      prisma.post.count(),
      prisma.post.findMany({
        ...(page === 1 ? {} : { skip: page * pageSize - 10 }),
        take: pageSize ? pageSize : 10,

        include: {
          locale: {
            where: {
              languageKey: req.headers.get("accept-language"),
            },
          },
          action: true,
        },

        orderBy: [
          {
            id: "desc",
          },
        ],
      }),
    ])
    return NextResponse.json({
      data: data[1],
      pagination: {
        total: data[0],
        pageSize: pageSize ? pageSize : 10,
        page: page ? page : 1,
      },
    })
  } catch (error) {
    return console.log(error)
  }
}
