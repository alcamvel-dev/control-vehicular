'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClientesPage() {

  const [clientes, setClientes] = useState<any[]>([])

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')

  useEffect(() => {

    obtenerClientes()

  }, [])

  const obtenerClientes = async () => {

    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('id', { ascending: false })

    if (!error && data) {

      setClientes(data)

    }

  }

  const guardarCliente = async () => {

    if (!nombre || !telefono || !correo) {

      return alert('Completa todos los campos')

    }

    const { error } = await supabase
      .from('clientes')
      .insert([
        {
          nombre,
          telefono,
          correo,
        }
      ])

    if (error) {

      return alert(error.message)

    }

    setNombre('')
    setTelefono('')
    setCorreo('')

    obtenerClientes()

  }

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        Clientes
      </h1>

      {/* FORMULARIO */}

      <div className="bg-white p-6 rounded shadow mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Nuevo Cliente
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="border p-3 rounded"
          />

          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="border p-3 rounded"
          />

        </div>

        <button
          onClick={guardarCliente}
          className="bg-black text-white px-6 py-3 rounded mt-6"
        >
          Guardar Cliente
        </button>

      </div>

      {/* TABLA */}

      <div className="bg-white p-6 rounded shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Nombre
              </th>

              <th className="text-left p-3">
                Teléfono
              </th>

              <th className="text-left p-3">
                Correo
              </th>

            </tr>

          </thead>

          <tbody>

            {clientes.map((cliente) => (

              <tr
                key={cliente.id}
                className="border-b"
              >

                <td className="p-3">
                  {cliente.nombre}
                </td>

                <td className="p-3">
                  {cliente.telefono}
                </td>

                <td className="p-3">
                  {cliente.correo}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}