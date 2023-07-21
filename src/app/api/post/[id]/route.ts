import prisma from "@/src/lib/prisma"
import { convertToSlug } from "@/src/lib/string"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }) {
  try {
    const data = await prisma.post.findFirst({
      where: {
        id: Number(params?.id),
      },
      include: {
        locale: {
          where: {
            languageKey: req.headers.get("accept-language"),
          },
        },
      },
    })

    return NextResponse.json({ data })
  } catch (error) {
    return console.log(error)
  }
}

export async function POST(req: NextRequest, { params }) {
  try {
    const formData: any = await req.json()

    const data = await prisma.post.create({
      data: {
        locale: {
          create: {
            ...formData,
            slug: convertToSlug(formData.title),
            language: {
              connect: { key: req.headers.get("accept-language") },
            },
          },
        },
      },
    })

    return NextResponse.json({ data })
  } catch (error) {
    return console.log(error)
  }
}
export async function PUT(req: NextRequest, { params }) {
  try {
    const formData: any = await req.json()
    const getOriginData = { ...formData }
    delete formData["idLocale"]

    const data = await prisma.post.update({
      where: { id: Number(params?.id) },
      data: {
        locale: {
          upsert: {
            create: {
              ...formData,
              slug: convertToSlug(formData.title),
              language: {
                connect: { key: req.headers.get("accept-language") },
              },
            },
            update: {
              ...formData,
              slug: convertToSlug(formData.title),
              language: {
                connect: { key: req.headers.get("accept-language") },
              },
            },
            where: {
              id: getOriginData?.idLocale ? Number(getOriginData?.idLocale) : 0,
            },
          },
        },
      },
    })

    return NextResponse.json({ data })
  } catch (error) {
    return console.log(error)
  }
}
