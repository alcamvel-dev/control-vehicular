'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClientesPage() {

  const [clientes, setClientes] = useState<any[]>([])

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')

  useEffect(() => {

    cargarClientes()

  }, [])

  async function cargarClientes() {

    const { data } =
      await supabase
      .from('clientes')
      .select('*')

    if (data) {

      setClientes(data)

    }

  }

  async function crearCliente() {

    await supabase
      .from('clientes')
      .insert({

        nombre,
        telefono,
        correo,

      })

    setNombre('')
    setTelefono('')
    setCorreo('')

    cargarClientes()

  }

  return (

    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Clientes
      </h1>

      <div className="bg-white p-8 rounded-xl shadow mb-10">

        <h2 className="text-3xl font-bold mb-6">
          Nuevo Cliente
        </h2>

        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) =>
            setTelefono(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          placeholder="Correo"
          value={correo}
          onChange={(e) =>
            setCorreo(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <button
          onClick={crearCliente}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Guardar Cliente
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {clientes.map((cliente) => (

          <div
            key={cliente.id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-2xl font-bold mb-3">
              {cliente.nombre}
            </h2>

            <p>
              {cliente.telefono}
            </p>

            <p>
              {cliente.correo}
            </p>

          </div>

        ))}

      </div>

    </main>

  )

}