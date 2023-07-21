"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next-intl/client"
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  username: string
  password: string
}
export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const router = useRouter()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn("credentials", {
      username: data["username"],
      password: data["password"],
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        alert(result?.error)
      } else {
        router.refresh()
        router.push("/post")
      }
    })
  }
  return (
    <div className="w-full max-w-xs m-auto pt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Username"
            defaultValue="admin"
            aria-invalid={errors.username ? "true" : "false"}
            {...register("username", { required: true })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password*
          </label>
          <input
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
            type="password"
            defaultValue="admin"
            placeholder="******************"
            aria-invalid={errors.password ? "true" : "false"}
            {...register("password", { required: true })}
          />
          {errors?.["password"] ? (
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )

  // const locale = useLocale()
  // const t = useTranslations("Login")
  // const [error, setError] = useState<string>()
  // const router = useRouter()

  // function onSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  //   if (error) setError(undefined)

  //   const formData = new FormData(event.currentTarget)
  //   signIn("credentials", {
  //     username: formData.get("username"),
  //     password: formData.get("password"),
  //     redirect: false,
  //   }).then((result) => {
  //     if (result?.error) {
  //       setError(result.error)
  //     } else {
  //       router.push("/" + locale)
  //     }
  //   })
  // }

  // return (
  //   <form
  //     action="/api/auth/callback/credentials"
  //     method="post"
  //     onSubmit={onSubmit}
  //     style={{ display: "flex", flexDirection: "column", gap: 10, width: 300 }}
  //   >
  //     <label style={{ display: "flex" }}>
  //       <span style={{ display: "inline-block", flexGrow: 1, minWidth: 100 }}>{t("username")}</span>
  //       <input name="username" type="text" />
  //     </label>
  //     <label style={{ display: "flex" }}>
  //       <span style={{ display: "inline-block", flexGrow: 1, minWidth: 100 }}>{t("password")}</span>
  //       <input name="password" type="password" />
  //     </label>
  //     {error && <p>{t("error", { error })}</p>}
  //     <button type="submit">{t("submit")}</button>
  //   </form>
  // )
}
