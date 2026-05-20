'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {

  const [clientes, setClientes] = useState(0)
  const [vehiculos, setVehiculos] = useState(0)
  const [documentos, setDocumentos] = useState(0)
  const [vencimientos, setVencimientos] = useState(0)

  useEffect(() => {

    obtenerDatos()

  }, [])

  const obtenerDatos = async () => {

    const { count: clientesCount } = await supabase
      .from('clientes')
      .select('*', { count: 'exact', head: true })

    const { count: vehiculosCount } = await supabase
      .from('vehiculos')
      .select('*', { count: 'exact', head: true })

    const { count: documentosCount } = await supabase
      .from('documentos')
      .select('*', { count: 'exact', head: true })

    const { count: vencimientosCount } = await supabase
      .from('vencimientos')
      .select('*', { count: 'exact', head: true })

    setClientes(clientesCount || 0)
    setVehiculos(vehiculosCount || 0)
    setDocumentos(documentosCount || 0)
    setVencimientos(vencimientosCount || 0)

  }

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-gray-500">
            Clientes
          </h2>

          <p className="text-4xl font-bold mt-2">
            {clientes}
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-gray-500">
            Vehículos
          </h2>

          <p className="text-4xl font-bold mt-2">
            {vehiculos}
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-gray-500">
            Documentos
          </h2>

          <p className="text-4xl font-bold mt-2">
            {documentos}
          </p>

        </div>

        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-gray-500">
            Vencimientos
          </h2>

          <p className="text-4xl font-bold mt-2">
            {vencimientos}
          </p>

        </div>

      </div>

    </div>

  )

}