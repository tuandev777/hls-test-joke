import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { ReactNode } from "react"
import Image from "next/image"
import LocaleSwitcher from "../components/LocaleSwitcher"
import logo from "../../../public/logo.png"
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
            <div className="container m-auto flex justify-between items-center">
              <Link href={"/" + locale}>
                <Image priority src={logo} alt="logo" width={100} height={100} />
              </Link>
              <div>
                <LocaleSwitcher userName={session?.user?.name} />
              </div>
            </div>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
