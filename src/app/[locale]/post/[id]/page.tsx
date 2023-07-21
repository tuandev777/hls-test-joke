import Skeleton from "@/src/app/components/Skeleton"
import { API_URL } from "@/src/configs/generals"
import dynamic from "next/dynamic"

const PostDetail = dynamic(() => import("./PostDetail"), {
  ssr: false,
  loading: () => <Skeleton />,
})

async function getData(locale, id) {
  const res = await fetch(`${API_URL}/api/post/${id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Accept-Language": locale || "en",
    },
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors

  const data = await res.json()
  return data
}
export default async function Post({
  params: { id, locale },
}: {
  params: { locale: string; id: string }
}) {
  let dataUpdate
  if (id !== "create") {
    dataUpdate = await getData(locale, id)
  }
  return <PostDetail dataUpdate={dataUpdate} id={id} locale={locale} />
}
