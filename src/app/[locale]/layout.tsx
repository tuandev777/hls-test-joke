import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { ReactNode } from "react"
import Image from "next/image"
import LocaleSwitcher from "../components/LocaleSwitcher"
import logo from "../../../public/logo1.png"
import { getServerSession } from "next-auth"
import auth from "@/src/auth"
import Link from "next/link"

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  let messages
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
  const session = await getServerSession(auth)

  return (
    <html lang={locale}>
      <head>
        <title>Test</title>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main>
            <div className="container m-auto flex justify-between items-center py-3">
              <Link href={"/" + locale}>
                <Image priority src={logo} alt="logo" width={80} height={80} />
              </Link>
              <div>
                <LocaleSwitcher userName={session?.user?.name} />
              </div>
            </div>
            <div className="content">
              <div className="content-inside">{children}</div>
            </div>
            <footer className="footer py-6  ">
              <div className="border-t border-slate-300 pb-8 "></div>
              <div className="text-center flex flex-col container m-auto">
                <span className="text-slate-500">
                  This website is created as part of Hisolutions program. the materials contained on
                  this website are provided for general information only and do not contribure any
                  form of advice. HLS assumes no responsibility for the accuracuracy of any
                  particular statement and accepts no ability for any loss or damege may arise from
                  rollance on the information conrained on this site
                </span>
                <span>Copyright 2021 HLS</span>
              </div>
            </footer>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
