'use client'

import {
  useEffect,
  useState
} from 'react'

import { supabase } from '@/lib/supabase'

export default function AlertasPage() {

  const [alertas, setAlertas] =
    useState<any[]>([])

  useEffect(() => {
    obtenerAlertas()
  }, [])

  const obtenerAlertas = async () => {

    const { data } = await supabase
      .from('vencimientos')
      .select('*')

    if (data) {

      const hoy = new Date()

      const alertasProcesadas =
        data.map((item) => {

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

          return {
            ...item,
            dias
          }

        })

      setAlertas(alertasProcesadas)
    }
  }

  return (

    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Alertas Automáticas
      </h1>

      <div className="space-y-6">

        {alertas.map((item) => (

          <div
            key={item.id}
            className={`
              bg-white
              p-6
              rounded-xl
              shadow
              border-l-8

              ${
                item.dias <= 0
                  ? 'border-red-600'
                  : item.dias <= 7
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
              Fecha:
              {' '}
              {item.fecha_vencimiento}
            </p>

            <p className="font-bold text-lg">

              {
                item.dias <= 0
                ? '🔴 DOCUMENTO VENCIDO'
                : item.dias <= 7
                ? `⚠️ Vence en ${item.dias} días`
                : `✅ Vigente (${item.dias} días)`
              }

            </p>

          </div>

        ))}

      </div>

    </main>

  )

}