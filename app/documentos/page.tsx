'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DocumentosPage() {

  const [vehiculos, setVehiculos] = useState<any[]>([])
  const [vehiculoId, setVehiculoId] = useState('')
  const [tipoDocumento, setTipoDocumento] = useState('')
  const [archivo, setArchivo] = useState<any>(null)

  useEffect(() => {
    obtenerVehiculos()
  }, [])

  const obtenerVehiculos = async () => {

    const { data } = await supabase
      .from('vehiculos')
      .select(`
        *,
        clientes(nombre)
      `)

    if (data) setVehiculos(data)
  }

  const subirDocumento = async () => {

    if (!archivo) {
      return alert('Selecciona archivo')
    }

    const nombreArchivo = `${Date.now()}-${archivo.name}`

    const { error: uploadError } = await supabase
      .storage
      .from('documentos')
      .upload(nombreArchivo, archivo)

    if (uploadError) {
      return alert(uploadError.message)
    }

    const archivoUrl =
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/documentos/${nombreArchivo}`

    const { error } = await supabase
      .from('documentos')
      .insert([
        {
          vehiculo_id: vehiculoId,
          tipo_documento: tipoDocumento,
          archivo_url: archivoUrl,
          estatus: 'Pendiente'
        }
      ])

    if (error) {
      alert(error.message)
    } else {
await supabase
  .from('timeline')
  .insert([
    {
      vehiculo_id: vehiculoId,
      descripcion:
        `Se subió documento: ${tipoDocumento}`
    }
  ])
      alert('Documento subido correctamente')

      setVehiculoId('')
      setTipoDocumento('')
      setArchivo(null)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Gestión de Documentos
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="grid gap-4">

          <select
            className="border p-3 rounded"
            value={vehiculoId}
            onChange={(e) => setVehiculoId(e.target.value)}
          >
            <option value="">
              Selecciona Vehículo
            </option>

            {vehiculos.map((vehiculo) => (

              <option
                key={vehiculo.id}
                value={vehiculo.id}
              >
                {vehiculo.marca} {vehiculo.modelo} - {vehiculo.placas}
              </option>

            ))}

          </select>

          <select
            className="border p-3 rounded"
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
          >
            <option value="">
              Tipo Documento
            </option>

            <option>
              Tarjeta Circulación
            </option>

            <option>
              INE
            </option>

            <option>
              Seguro
            </option>

            <option>
              Verificación
            </option>

            <option>
              Tenencia
            </option>

          </select>

          <input
            type="file"
            className="border p-3 rounded"
            onChange={(e) =>
              setArchivo(e.target.files?.[0])
            }
          />

          <button
            onClick={subirDocumento}
            className="bg-black text-white p-3 rounded"
          >
            Subir Documento
          </button>

        </div>

      </div>

    </main>
  )
}