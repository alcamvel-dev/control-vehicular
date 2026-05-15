'use client'

'use client'

import {
  useEffect,
  useState
} from 'react'

import { supabase } from '@/lib/supabase'

export default function DashboardPage() {

    const enviarCorreo = async () => {

  await fetch(
    '/api/enviar-alerta',
    {
      method: 'POST'
    }
  )

  alert(
    'Correo enviado'
  )

}

  const [clientes, setClientes] =
    useState(0)

  const [vehiculos, setVehiculos] =
    useState(0)

  const [vencidos, setVencidos] =
    useState(0)

  const [proximos, setProximos] =
    useState(0)

  useEffect(() => {
    cargarDashboard()
  }, [])

  const cargarDashboard = async () => {

    // CLIENTES
    const {
      data: clientesData
    } = await supabase
      .from('clientes')
      .select('*')

    setClientes(
      clientesData?.length || 0
    )

    // VEHÍCULOS
    const {
      data: vehiculosData
    } = await supabase
      .from('vehiculos')
      .select('*')

    setVehiculos(
      vehiculosData?.length || 0
    )

    // VENCIMIENTOS
    const {
      data: vencimientosData
    } = await supabase
      .from('vencimientos')
      .select('*')

    if (vencimientosData) {

      const hoy =
        new Date()

      let totalVencidos = 0
      let totalProximos = 0

      vencimientosData.forEach(
        (item) => {

          const fecha =
            new Date(
              item.fecha_vencimiento
            )

          const dias =
            Math.ceil(
              (
                fecha.getTime() -
                hoy.getTime()
              ) /
              (1000 * 60 * 60 * 24)
            )

          if (dias <= 0) {
            totalVencidos++
          }
          else if (dias <= 7) {
            totalProximos++
          }

        }
      )

      setVencidos(totalVencidos)
      setProximos(totalProximos)

    }

  }

  return (

    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Dashboard Ejecutivo
      </h1>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">

        {/* CLIENTES */}

        <div className="
          bg-white
          rounded-2xl
          shadow-lg
          p-8
        ">

          <h2 className="
            text-gray-500
            text-lg
            mb-2
          ">
            Clientes
          </h2>

          <p className="
            text-5xl
            font-bold
          ">
            {clientes}
          </p>

        </div>

        {/* VEHÍCULOS */}

        <div className="
          bg-white
          rounded-2xl
          shadow-lg
          p-8
        ">

          <h2 className="
            text-gray-500
            text-lg
            mb-2
          ">
            Vehículos
          </h2>

          <p className="
            text-5xl
            font-bold
          ">
            {vehiculos}
          </p>

        </div>

        {/* VENCIDOS */}

        <div className="
          bg-red-600
          text-white
          rounded-2xl
          shadow-lg
          p-8
        ">

          <h2 className="
            text-lg
            mb-2
          ">
            Vencidos
          </h2>

          <p className="
            text-5xl
            font-bold
          ">
            {vencidos}
          </p>

        </div>

        {/* PRÓXIMOS */}

        <div className="
          bg-yellow-500
          text-white
          rounded-2xl
          shadow-lg
          p-8
        ">

          <h2 className="
            text-lg
            mb-2
          ">
            Próximos
          </h2>

          <p className="
            text-5xl
            font-bold
          ">
            {proximos}
          </p>

        </div>

      </div>

<button

  onClick={enviarCorreo}

  className="
    mt-10
    bg-black
    text-white
    px-8
    py-4
    rounded-xl
    text-xl
  "

>

  Enviar Alerta Email

</button>

    </main>

  )

}