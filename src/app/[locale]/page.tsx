import { API_URL } from "@/src/configs/generals"
import Action from "./_Action"
import Post from "./_Post"
import { cookies } from "next/headers"
export const dynamic = "force-dynamic"
async function getData(locale) {
  const res = await fetch(`${API_URL}/api/random`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Accept-Language": locale,
      ...(cookies().toString() ? { Cookie: cookies().toString() } : {}),
    },
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors

  const data = await res.json()
  return data
}
export default async function Page({ params }: { params: { locale: string; slug: string } }) {
  const { data } = await getData(params?.locale)
  return (
    <section className="">
      <Post data={data} />
      <Action postId={data?.[0]?.id} />
    </section>
  )
}
