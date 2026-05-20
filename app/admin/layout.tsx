'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const cerrarSesion = async () => {

    await supabase.auth.signOut()

    router.push('/login')

  }

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <aside className="w-64 bg-black text-white p-6 flex flex-col">

        <div>

          <h1 className="text-3xl font-bold mb-10">
            PANEL ADMIN
          </h1>

          <nav className="flex flex-col gap-4">

            <Link
              href="/admin"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded transition"
            >
              Dashboard
            </Link>

            <Link
              href="/clientes"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded transition"
            >
              Clientes
            </Link>

            <Link
              href="/vehiculos"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded transition"
            >
              Vehículos
            </Link>

            <Link
              href="/documentos"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded transition"
            >
              Documentos
            </Link>

            <Link
              href="/vencimientos"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded transition"
            >
              Vencimientos
            </Link>

            <Link
              href="/timeline"
              className="bg-gray-900 hover:bg-gray-800 p-4 rounded transition"
            >
              Timeline
            </Link>

          </nav>

        </div>

        {/* BOTON LOGOUT */}

        <button
          onClick={cerrarSesion}
          className="mt-auto bg-red-600 hover:bg-red-700 p-4 rounded transition"
        >
          Cerrar sesión
        </button>

      </aside>

      {/* CONTENIDO */}

      <main className="flex-1 p-10">

        {children}

      </main>

    </div>

  )

}