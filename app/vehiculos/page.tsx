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
      'Pointer',
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
      .order('nombre')

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

    if (
      !clienteId ||
      !marca ||
      !modelo ||
      !placas ||
      !anio
    ) {

      return alert('Completa todos los campos')

    }

    const { error } = await supabase
      .from('vehiculos')
      .insert([
        {
          cliente_id: clienteId,
          marca,
          modelo,
          placas,
          anio,
        }
      ])

    if (error) {

      return alert(error.message)

    }

    setClienteId('')
    setMarca('')
    setModelo('')
    setPlacas('')
    setAnio('')

    obtenerVehiculos()

  }

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        Vehículos
      </h1>

      {/* FORMULARIO */}

      <div className="bg-white p-6 rounded shadow mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Nuevo Vehículo
        </h2>

        <div className="grid grid-cols-5 gap-4">

          {/* CLIENTE */}

          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
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

          {/* MARCA */}

          <select
            value={marca}
            onChange={(e) => {

              setMarca(e.target.value)
              setModelo('')

            }}
            className="border p-3 rounded"
          >

            <option value="">
              Marca
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

          {/* MODELO */}

          <select
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="border p-3 rounded"
          >

            <option value="">
              Modelo
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

          {/* PLACAS */}

          <input
            type="text"
            placeholder="Placas"
            value={placas}
            onChange={(e) => setPlacas(e.target.value)}
            className="border p-3 rounded"
          />

          {/* AÑO */}

          <input
            type="text"
            placeholder="Año"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            className="border p-3 rounded"
          />

        </div>

        <button
          onClick={guardarVehiculo}
          className="bg-black text-white px-6 py-3 rounded mt-6"
        >
          Guardar Vehículo
        </button>

      </div>

      {/* TABLA */}

      <div className="bg-white p-6 rounded shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Cliente
              </th>

              <th className="text-left p-3">
                Marca
              </th>

              <th className="text-left p-3">
                Modelo
              </th>

              <th className="text-left p-3">
                Placas
              </th>

              <th className="text-left p-3">
                Año
              </th>

            </tr>

          </thead>

          <tbody>

            {vehiculos.map((vehiculo) => (

              <tr
                key={vehiculo.id}
                className="border-b"
              >

                <td className="p-3">
                  {vehiculo.clientes?.nombre}
                </td>

                <td className="p-3">
                  {vehiculo.marca}
                </td>

                <td className="p-3">
                  {vehiculo.modelo}
                </td>

                <td className="p-3">
                  {vehiculo.placas}
                </td>

                <td className="p-3">
                  {vehiculo.anio}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}