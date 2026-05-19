'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function VehiculosPage() {

  const [clientes, setClientes] = useState<any[]>([])
  const [vehiculos, setVehiculos] = useState<any[]>([])

  const [clienteId, setClienteId] = useState('')
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [placas, setPlacas] = useState('')
  const [anio, setAnio] = useState('')

  const modelosPorMarca: any = {

    Volkswagen: [
      'Jetta',
      'Golf',
      'Tiguan',
      'Virtus',
    ],

    BMW: [
      'X5',
      'X3',
      '320i',
      'M3',
    ],

    Audi: [
      'A3',
      'A4',
      'Q5',
      'Q7',
    ],

    Toyota: [
      'Corolla',
      'Hilux',
      'Yaris',
      'RAV4',
    ],

    Nissan: [
      'Versa',
      'Sentra',
      'Xtrail',
      'Frontier',
    ],

  }

  useEffect(() => {

    obtenerClientes()
    obtenerVehiculos()

  }, [])

  const obtenerClientes = async () => {

    const { data, error } = await supabase
      .from('clientes')
      .select('*')

    if (!error && data) {

      setClientes(data)

    }

  }

  const obtenerVehiculos = async () => {

    const { data, error } = await supabase
      .from('vehiculos')
      .select(`
        *,
        clientes (
          nombre
        )
      `)
      .order('id', { ascending: false })

    if (!error && data) {

      setVehiculos(data)

    }

  }

  const guardarVehiculo = async () => {

    if (!clienteId) {

      return alert('Selecciona un cliente')

    }

    const { error } = await supabase
      .from('vehiculos')
      .insert([

        {
          cliente: clienteId,
          marca,
          modelo,
          placas,
          anio,
        }

      ])

    if (error) {

      alert(error.message)

    } else {

      alert('Vehículo guardado')

      setClienteId('')
      setMarca('')
      setModelo('')
      setPlacas('')
      setAnio('')

      obtenerVehiculos()

    }

  }

  return (

    <main className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-5xl font-bold mb-10">
        Registro de Vehículos
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-3xl font-bold mb-6">
          Nuevo Vehículo
        </h2>

        <div className="grid gap-4">

          <select
            value={clienteId}
            onChange={(e) =>
              setClienteId(e.target.value)
            }
            className="border p-3 rounded"
          >

            <option value="">
              Selecciona Cliente
            </option>

            {clientes.map((cliente) => (

              <option
                key={cliente.id}
                value={cliente.id}
              >
                {cliente.nombre}
              </option>

            ))}

          </select>

          <select
            value={marca}
            onChange={(e) => {

              setMarca(e.target.value)
              setModelo('')

            }}
            className="border p-3 rounded"
          >

            <option value="">
              Selecciona Marca
            </option>

            {Object.keys(modelosPorMarca).map((marcaItem) => (

              <option
                key={marcaItem}
                value={marcaItem}
              >
                {marcaItem}
              </option>

            ))}

          </select>

          <select
            value={modelo}
            onChange={(e) =>
              setModelo(e.target.value)
            }
            className="border p-3 rounded"
          >

            <option value="">
              Selecciona Modelo
            </option>

            {marca &&
              modelosPorMarca[marca]?.map((modeloItem: string) => (

                <option
                  key={modeloItem}
                  value={modeloItem}
                >
                  {modeloItem}
                </option>

              ))}

          </select>

          <input
            type="text"
            placeholder="Placas"
            value={placas}
            onChange={(e) =>
              setPlacas(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Año"
            value={anio}
            onChange={(e) =>
              setAnio(e.target.value)
            }
            className="border p-3 rounded"
          />

          <button
            onClick={guardarVehiculo}
            className="bg-black text-white p-3 rounded"
          >
            Guardar Vehículo
          </button>

        </div>

      </div>

      <div>

        <h2 className="text-3xl font-bold mb-6">
          Vehículos Registrados
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {vehiculos.map((vehiculo) => (

            <div
              key={vehiculo.id}
              className="bg-white p-6 rounded-xl shadow"
            >

              <h3 className="text-2xl font-bold mb-2">
                {vehiculo.marca}
              </h3>

              <p>
                Modelo: {vehiculo.modelo}
              </p>

              <p>
                Placas: {vehiculo.placas}
              </p>

              <p>
                Año: {vehiculo.anio}
              </p>

            </div>

          ))}

        </div>

      </div>

    </main>

  )

}