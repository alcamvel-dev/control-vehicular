'use client'

import {
  useEffect,
  useState
} from 'react'

import { supabase } from '@/lib/supabase'

export default function PortalPage() {

  const [vehiculos, setVehiculos] =
    useState<any[]>([])

  useEffect(() => {
    obtenerVehiculos()
  }, [])

  const obtenerVehiculos =
  async () => {

  const {
    data: usuarioData
  } = await supabase.auth.getUser()

  const usuario =
    usuarioData.user

  if (!usuario) return

  const {
    data: cliente
  } = await supabase
    .from('clientes')
    .select('*')
    .eq(
      'auth_id',
      usuario.id
    )
    .single()

  if (!cliente) return

  const {
    data: vehiculosData
  } = await supabase
    .from('vehiculos')
    .select('*')
    .eq(
      'cliente_id',
      cliente.id
    )

  if (vehiculosData) {

    setVehiculos(
      vehiculosData
    )

  }

}

  return (

    <main className="
      min-h-screen
      bg-gray-100
      p-10
    ">

      <h1 className="
        text-5xl
        font-bold
        mb-10
      ">

        Portal del Cliente

      </h1>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
      ">

        {vehiculos.map(
          (vehiculo) => (

          <div
            key={vehiculo.id}
            className="
              bg-white
              rounded-2xl
              shadow-lg
              p-8
            "
          >

            <h2 className="
              text-3xl
              font-bold
              mb-4
            ">

              {vehiculo.marca}
              {' '}
              {vehiculo.modelo}

            </h2>

            <p className="mb-2">

              <strong>
                Placas:
              </strong>

              {' '}

              {vehiculo.placas}

            </p>

            <p className="mb-2">

              <strong>
                Año:
              </strong>

              {' '}

              {vehiculo.anio}

            </p>

            <a

              href={
                `/expediente/${vehiculo.id}`
              }

              className="
                inline-block
                mt-4
                bg-black
                text-white
                px-6
                py-3
                rounded-xl
              "

            >

              Ver Expediente

            </a>

          </div>

        ))}

      </div>

    </main>

  )

}