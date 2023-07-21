"use client"

import dynamic from "next/dynamic"
import Skeleton from "../Skeleton"

const Table = dynamic(() => import("./Table"), {
  ssr: false,
  loading: () => <Skeleton />,
})
export default Table
