'use client'

import {
  useEffect,
  useState
} from 'react'

import { useParams } from 'next/navigation'

import { supabase } from '@/lib/supabase'

export default function ExpedientePage() {

  const params = useParams()
  const [vehiculo, setVehiculo] = useState<any>(null)
  const [documentos, setDocumentos] = useState<any[]>([])
  const [timeline, setTimeline] = useState<any[]>([])

  useEffect(() => {
    if (params?.id) {
      obtenerVehiculo()
      obtenerDocumentos()
      obtenerTimeline()
    }
  }, [params?.id])

  const obtenerVehiculo = async () => {

    const { data } = await supabase
      .from('vehiculos')
      .select(`
        *,
        clientes (
          nombre,
          telefono,
          correo
        )
      `)
      .eq('id', params?.id)
      .single()

    if (data) setVehiculo(data)
  }

  const obtenerDocumentos = async () => {

    const { data } = await supabase
      .from('documentos')
      .select('*')
      .eq('vehiculo_id', params?.id)
      .order('fecha_subida', {
        ascending: false
      })

    if (data) setDocumentos(data)
  }

  const obtenerTimeline = async () => {

    const { data } = await supabase
      .from('timeline')
      .select('*')
      .eq('vehiculo_id', params?.id)
      .order('fecha', {
        ascending: false
      })

    if (data) setTimeline(data)
  }

  if (!vehiculo) {
    return (
      <main className="p-10">
        Cargando expediente...
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Expediente Vehicular
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Información del Vehículo
        </h2>

        <p>
          <strong>Marca:</strong>
          {' '}
          {vehiculo.marca}
        </p>

        <p>
          <strong>Modelo:</strong>
          {' '}
          {vehiculo.modelo}
        </p>

        <p>
          <strong>Placas:</strong>
          {' '}
          {vehiculo.placas}
        </p>

        <p>
          <strong>Año:</strong>
          {' '}
          {vehiculo.anio}
        </p>

      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Cliente
        </h2>

        <p>
          <strong>Nombre:</strong>
          {' '}
          {vehiculo.clientes?.nombre}
        </p>

        <p>
          <strong>Teléfono:</strong>
          {' '}
          {vehiculo.clientes?.telefono}
        </p>

        <p>
          <strong>Correo:</strong>
          {' '}
          {vehiculo.clientes?.correo}
        </p>

      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Documentos
        </h2>

        <div className="space-y-4">

          {documentos.map((doc) => (

            <div
              key={doc.id}
              className="border p-4 rounded"
            >

              <p>
                <strong>
                  {doc.tipo_documento}
                </strong>
              </p>

              <p>
                Estatus:
                {' '}
                {doc.estatus}
              </p>

              <a
                href={doc.archivo_url}
                target="_blank"
                className="text-blue-600 underline"
              >
                Ver Documento
              </a>

            </div>

          ))}

        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Timeline
        </h2>

        <div className="space-y-4">

          {timeline.map((item) => (

            <div
              key={item.id}
              className="border-l-4 border-black pl-4"
            >

              <p className="text-sm text-gray-500">
                {new Date(item.fecha)
                  .toLocaleString()}
              </p>

              <p>
                {item.descripcion}
              </p>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}