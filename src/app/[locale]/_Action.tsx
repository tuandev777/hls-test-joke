"use client"
import Link from "next/link"
import { message } from "antd"
import { useLocale, useTranslations } from "next-intl"
import { API_URL } from "@/src/configs/generals"
import { useRouter } from "next-intl/client"

export default function Action({ postId }) {
  const t = useTranslations("general")
  const router = useRouter()

  const handleAction = (type) => {
    fetch(`${API_URL}/api/action`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        type,
        postId,
      }),
    })
      .then(async (res) => {
        const data = await res.json()
        if (data?.data) router.refresh()
      })
      .catch((err) => message.error("Error"))
  }
  if (postId) {
    return (
      <>
        <div className="border-t border-slate-200 pt-10 w-1/2 m-auto"></div>
        <div className="text-center">
          <button
            onClick={() => handleAction("like")}
            className="bg-[#2c7EDB] text-white  py-2 px-16  mx-3"
          >
            {t("funny")}
          </button>
          <button
            onClick={() => handleAction("dislike")}
            className="bg-[#29B363]  text-white  py-2 px-16 "
          >
            {t("suck")}
          </button>
        </div>
      </>
    )
  } else return <></>
}
