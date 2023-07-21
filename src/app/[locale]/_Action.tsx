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
      <div className="text-center">
        <button
          onClick={() => handleAction("like")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-3"
        >
          {t("funny")}
        </button>
        <button
          onClick={() => handleAction("dislike")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          {t("suck")}
        </button>
      </div>
    )
  } else return <></>
}
