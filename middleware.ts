// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { PublicRoutes } from 'routes'
import { arqustikConfig } from 'arqustik.config'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: arqustikConfig.NEXT_AUTH_SECRET })
  if (session === null) return NextResponse.redirect(new URL(PublicRoutes.SIGNIN, req.url))
  else return NextResponse.next()
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/private/:path*',
}
// Poder Cambiar los headers
/* 
const requestHeaders = new Headers(req.headers)
  requestHeaders.set('next', 'tuti')

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
*/
