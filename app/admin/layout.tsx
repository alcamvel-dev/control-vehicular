'use client'

import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <aside className="w-64 bg-black text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          PANEL ADMIN
        </h1>

        <nav className="flex flex-col gap-4">

          <Link
            href="/admin"
            className="bg-gray-900 p-4 rounded"
          >
            Dashboard
          </Link>

          <Link
            href="/clientes"
            className="bg-gray-900 p-4 rounded"
          >
            Clientes
          </Link>

          <Link
            href="/vehiculos"
            className="bg-gray-900 p-4 rounded"
          >
            Vehículos
          </Link>

          <Link
            href="/documentos"
            className="bg-gray-900 p-4 rounded"
          >
            Documentos
          </Link>

          <Link
            href="/vencimientos"
            className="bg-gray-900 p-4 rounded"
          >
            Vencimientos
          </Link>

          <Link
            href="/timeline"
            className="bg-gray-900 p-4 rounded"
          >
            Timeline
          </Link>

        </nav>

      </aside>

      {/* CONTENIDO */}

      <main className="flex-1 p-10">

        {children}

      </main>

    </div>

  )

}