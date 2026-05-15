'use client'

import Link from 'next/link'

export default function AdminPage() {

  return (

    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Panel Administrador
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link
          href="/clientes"
          className="bg-white p-8 rounded-xl shadow hover:shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-3">
            Clientes
          </h2>

          <p>
            Administrar clientes
          </p>
        </Link>

        <Link
          href="/vehiculos"
          className="bg-white p-8 rounded-xl shadow hover:shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-3">
            Vehículos
          </h2>

          <p>
            Control vehicular
          </p>
        </Link>

        <Link
          href="/vencimientos"
          className="bg-white p-8 rounded-xl shadow hover:shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-3">
            Vencimientos
          </h2>

          <p>
            Alertas y documentos
          </p>
        </Link>

      </div>

    </main>

  )

}