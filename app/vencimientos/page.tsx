'use client'

import {
  useEffect,
  useState
} from 'react'

import { supabase } from '@/lib/supabase'

export default function VencimientosPage() {

  const [vencimientos, setVencimientos] =
    useState<any[]>([])

  useEffect(() => {
    console.log('EJECUTANDO USE EFFECT')
    obtenerVencimientos()
  }, [])

  const obtenerVencimientos = async () => {

    const {
      data,
      error
    } = await supabase
      .from('vencimientos')
      .select('*')

    console.log(data)
    console.log(error)

    console.log(data)
console.log(error)
    if (data) {
      setVencimientos(data)
    }
  }

  const calcularDias = (
    fecha: string
  ) => {

    const hoy = new Date()

    const vencimiento =
      new Date(fecha)

    const diferencia =
      vencimiento.getTime() -
      hoy.getTime()

    return Math.ceil(
      diferencia /
      (1000 * 60 * 60 * 24)
    )
  }

  return (

    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Vencimientos
      </h1>

      <div className="space-y-6">

        {vencimientos.map((item) => {

          const dias =
            calcularDias(
              item.fecha_vencimiento
            )

          return (

            <div
              key={item.id}
              className={`
                bg-white
                p-6
                rounded-xl
                shadow
                border-l-8

                ${
                  dias <= 0
                    ? 'border-red-600'
                    : dias <= 7
                    ? 'border-yellow-500'
                    : 'border-green-600'
                }
              `}
            >

              <h2 className="text-2xl font-bold mb-2">
                {item.tipo_documento}
              </h2>

              <p className="mb-2">
                Vehículo ID:
                {' '}
                {item.vehiculo_id}
              </p>

              <p className="mb-2">
                Fecha vencimiento:
                {' '}
                {item.fecha_vencimiento}
              </p>

              <p className="font-bold">

                {
                  dias <= 0
                  ? '🔴 VENCIDO'
                  : dias <= 7
                  ? `⚠️ Vence en ${dias} días`
                  : `✅ Vigente (${dias} días)`
                }

              </p>

            </div>

          )
        })}

      </div>

    </main>

  )

}