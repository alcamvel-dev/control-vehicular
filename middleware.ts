import {
  NextResponse
} from 'next/server'

import type {
  NextRequest
} from 'next/server'

export function middleware(
  request: NextRequest
) {

  const token =
    request.cookies.get(
      'sb-access-token'
    )

  const rutasProtegidas = [

    '/portal',
    '/dashboard',
    '/clientes',
    '/vehiculos',
    '/documentos',
    '/vencimientos',
    '/expediente'

  ]

  const proteger =
    rutasProtegidas.some(
      (ruta) =>
        request.nextUrl.pathname.startsWith(ruta)
    )

  if (
    proteger &&
    !token
  ) {

    return NextResponse.redirect(
      new URL(
        '/login',
        request.url
      )
    )

  }

  return NextResponse.next()

}