"use client"
import Link from "next-intl/link"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import user from "../../../public/user.png"
import Image from "next/image"

export default function LocaleSwitcher({ userName }) {
  const locale = useLocale()
  const pathName = usePathname()
  const router = useRouter()
  const t = useTranslations("general")

  const handleChangeLocale = (event) => {
    if (!pathName) return router.push("/")
    const segments = pathName.split("/")
    if (locale === "en") {
      segments[0] = event.target.value

      return router.push(`/${segments.join("/")}`)
    } else {
      segments[1] = event.target.value

      return router.push(`${segments.join("/")}`)
    }
  }

  return (
    <div className=" flex flex-row space-x-2">
      {/* <select value={locale} onChange={handleChangeLocale}>
        {[
          { title: t("vietnamese"), key: "vi" },
          { title: t("english"), key: "en" },
        ]?.map((locale) => {
          return (
            <option key={locale.key} value={locale.key}>
              {locale.title}
            </option>
          )
        })}
      </select> */}
      <div className=" flex flex-col">
        <span className="text-slate-500 italic ">Handycraff by</span>
        {userName ? (
          <span>
            {userName}&nbsp;&nbsp;
            <span className="cursor-pointer" onClick={() => signOut()}>
              {" "}
              Sign out
            </span>
          </span>
        ) : (
          <span>
            <Link href={"/login"}>{t("login")}</Link>
          </span>
        )}
      </div>
      <Image priority src={user} alt="user" width={50} height={50} />
    </div>
  )
}
