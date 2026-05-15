'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TimelinePage() {

  const [timeline, setTimeline] = useState<any[]>([])

  useEffect(() => {
    obtenerTimeline()
  }, [])

  const obtenerTimeline = async () => {

    const { data } = await supabase
      .from('timeline')
      .select(`
        *,
        vehiculos (
          marca,
          modelo,
          placas
        )
      `)
      .order('fecha', { ascending: false })

    if (data) {
      setTimeline(data)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Timeline de Actividades
      </h1>

      <div className="space-y-6">

        {timeline.map((item) => (

          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow border-l-4 border-black"
          >

            <p className="text-sm text-gray-500 mb-2">
              {new Date(item.fecha).toLocaleString()}
            </p>

            <h2 className="text-xl font-bold mb-2">
              {item.descripcion}
            </h2>

            <p>
              Vehículo:
              {' '}
              {item.vehiculos?.marca}
              {' '}
              {item.vehiculos?.modelo}
              {' '}
              - {item.vehiculos?.placas}
            </p>

          </div>

        ))}

      </div>

    </main>
  )
}