import prisma from "@/src/lib/prisma"
import { NextResponse } from "next/server"
import dataClone from "../../../data.json"
import { convertToSlug } from "@/src/lib/string"

export async function POST(req: Request, params) {
  console.log("🚀 ~ file: route.ts:22 ~ POST ~ params:", params)
  try {
    await prisma.language.createMany({
      data: [
        { name: "Vietnamese", key: "vi" },
        { name: "English", key: "en" },
      ],
    })

    await Promise.all(
      dataClone.map(async (item) => {
        await prisma.post.create({
          data: {
            locale: {
              create: {
                ...item,
                slug: convertToSlug(item.title),
                language: {
                  connect: { key: req.headers.get("accept-language") },
                },
              },
            },
          },
        })
      })
    )

    return NextResponse.json({ data: "Ok" })
  } catch (error) {
    return console.log(error)
  }
}
