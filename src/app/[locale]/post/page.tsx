import { useTranslations } from "next-intl"
import Table from "../../components/Table"
import { API_URL } from "@/src/configs/generals"
export const dynamic = "force-dynamic"
async function getData(locale, searchParams) {
  const params = "?" + new URLSearchParams(searchParams).toString()
  const res = await fetch(`${API_URL}/api/post${params}`, {
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
  params,
  searchParams,
}: {
  params: { locale: string; slug: string }
  searchParams
}) {
  const data = await getData(params?.locale, searchParams)

  return <Table data={data?.data} pagination={data?.pagination} />
}
