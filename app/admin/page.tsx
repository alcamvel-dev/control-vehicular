'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {

  const [clientes, setClientes] = useState(0)
  const [vehiculos, setVehiculos] = useState(0)
  const [vencimientos, setVencimientos] = useState(0)

  useEffect(() => {

    cargarDatos()

  }, [])

  async function cargarDatos() {

    const clientesDB =
      await supabase
      .from('clientes')
      .select('*')

    const vehiculosDB =
      await supabase
      .from('vehiculos')
      .select('*')

    const vencimientosDB =
      await supabase
      .from('vencimientos')
      .select('*')

    setClientes(
      clientesDB.data?.length || 0
    )

    setVehiculos(
      vehiculosDB.data?.length || 0
    )

    setVencimientos(
      vencimientosDB.data?.length || 0
    )

  }

  return (

    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Panel Administrador
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-3xl font-bold">
            {clientes}
          </h2>

          <p>
            Clientes registrados
          </p>

        </div>

        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-3xl font-bold">
            {vehiculos}
          </h2>

          <p>
            Vehículos registrados
          </p>

        </div>

        <div className="bg-white p-8 rounded-xl shadow">

          <h2 className="text-3xl font-bold">
            {vencimientos}
          </h2>

          <p>
            Vencimientos
          </p>

        </div>

      </div>

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