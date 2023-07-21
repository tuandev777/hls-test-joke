"use client"
import React from "react"
import { message, Spin } from "antd"
import { useRouter } from "next-intl/client"
import { useForm, SubmitHandler } from "react-hook-form"
import { API_URL } from "@/src/configs/generals"

type Inputs = {
  title: string
  description: string
  content: string
}
export default function PostDetail({ dataUpdate, id, locale }) {
  const [loading, setLoading] = React.useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  React.useEffect(() => {
    if (dataUpdate?.data?.locale?.[0]) {
      const { title, description, content } = dataUpdate?.data?.locale[0]
      setValue("title", title)
      setValue("description", description)
      setValue("content", content)
    }
  }, [dataUpdate, setValue])

  const router = useRouter()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true)
    fetch(`${API_URL}/api/post/${id}`, {
      method: dataUpdate ? "PUT" : "POST",
      headers: {
        "Content-type": "application/json",
        "Accept-Language": locale,
      },
      body: JSON.stringify({
        ...data,
        ...(dataUpdate?.data?.locale?.[0] ? { idLocale: dataUpdate?.data?.locale?.[0]?.id } : {}),
      }),
    })
      .then((res) => message?.success("Thành công"))
      .catch((err) => message.error("Error"))
      .finally(() => {
        setLoading(false)
        router.push("/post")
      })
  }
  return (
    <Spin tip="Loading" spinning={loading}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 container m-auto"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title*
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Title"
            aria-invalid={errors.title ? "true" : "false"}
            {...register("title", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Description"
            {...register("description")}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Content"
            {...register("content")}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </Spin>
  )
}
