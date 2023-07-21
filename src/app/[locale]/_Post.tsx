"use client"
import React from "react"

import { useTranslations } from "next-intl"
export default function Post({ data }) {
  const t = useTranslations("general")
  if (!data[0]?.locale?.[0])
    return (
      <div className=" bg-emerald-600 w-full h-52 text-white">
        <div className="pt-14 text-center">
          <p className=" text-2xl">{t("no_joke")}</p>
        </div>
      </div>
    )
  const { title, description, content } = data[0]?.locale?.[0]
  return (
    <>
      <div className=" bg-emerald-600 w-full h-52 text-white">
        <div className="pt-14 text-center">
          <p className=" text-2xl">{title}</p>
          <span className="  mt-3">{description}</span>
        </div>
      </div>
      <div className=" container m-auto text-center my-10">{content}</div>
    </>
  )
}
