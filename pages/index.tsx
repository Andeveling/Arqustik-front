import Container from "@components/Container"
import { Suspense } from "react"
import { Grid } from "@mui/material"

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Container>
        <h1> Algo</h1>
      </Container>
    </Suspense>
  )
}
