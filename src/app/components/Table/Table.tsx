import React, { useMemo } from "react"
import { Table as TableAnt, Pagination, Button } from "antd"
import { useLocale, useTranslations } from "next-intl"
import Link from "next-intl/link"
import { API_URL } from "@/src/configs/generals"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
export default function TableLoading({ data = [], pagination }) {
  console.log("🚀 ~ file: Table.tsx:8 ~ TableLoading ~ data:", data)
  const t = useTranslations("general")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleClone = async () => {
    await fetch(`${API_URL}/api/clone`, {
      method: "POST",
      headers: {
        "Accept-Language": locale,
      },
    })
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  const handlePaginationChange = (page, pageSize) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("page", page)
    current.set("pageSize", pageSize)
    const search = current.toString()
    const query = search ? `?${search}` : ""

    router.push(`${pathname}${query}`)
  }

  const renderColumn = ["id", "title", "slug", "description", "like", "dislike", "action"].map(
    (item) => ({
      key: item,
      title: capitalizeFirstLetter(item),
      dataIndex: item,
      render: (text: string, record, index) => {
        if (item === "action") {
          return (
            <Link
              href={"/post" + "/" + record?.id}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-3"
            >
              {t("edit")}
            </Link>
          )
        } else if (item === "like" || item === "dislike")
          return record?.action ? record?.action[item] : 0
        else return text
      },
    })
  )

  return (
    <div className=" container m-auto space-y-6">
      <button onClick={handleClone}>Clone</button>
      <TableAnt
        columns={renderColumn}
        dataSource={data?.map((item) => ({
          ...(item.locale ? { ...item.locale[0] } : {}),
          ...item,
        }))}
        pagination={false}
        rowClassName="table-ant-select"
        rowKey="id"
        scroll={{
          x: "100%",
        }}
        // expandable={{
        //   expandedRowRender: record => {
        //     return isGettingChildren.some(id => id === record.id) ? (
        //       <Spin spinning className="flex items-center justify-center" />
        //     ) : (
        //       expandedRowRender(record)
        //     );
        //   },
        //   rowExpandable: record =>
        //     isAttribute || isCategories
        //       ? record?.hasChildren
        //         ? true
        //         : false
        //       : Array.isArray(record.children) && record.children.length > 0,
        //   showExpandColumn: showExpand,
        //   childrenColumnName: 'tree_value',
        //   onExpand: (expand, record) => onExpand(record, expand, false),
        // }}
        showSorterTooltip={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {},
            onDoubleClick: (event) => {},
            onContextMenu: (event) => {},
            onMouseEnter: (event) => {},
            onMouseLeave: (event) => {},
          }
        }}
      />
      <div style={{ textAlign: "right", padding: 10 }}>
        <Pagination
          showSizeChanger
          defaultCurrent={1}
          current={pagination?.page || 1}
          total={pagination?.total || 0}
          pageSize={pagination?.pageSize || 10}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  )
}
