import { NextPage } from "next"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

const InvoicePDF = dynamic(() => import("./pdf"), {
  ssr: false,
})

const View: NextPage = () => {
  const [client, setClient] = useState(false)
  useEffect(() => setClient(true), [])
  return <InvoicePDF />
}

export default View
