import Container from '@components/Container'
import { Suspense } from 'react'

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Container>
        <h1>Bienvenido</h1>
      </Container>
    </Suspense>
  )
}
