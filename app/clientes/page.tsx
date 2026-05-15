'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClientesPage() {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')
  const [clientes, setClientes] = useState<any[]>([])

  useEffect(() => {
    obtenerClientes()
  }, [])

  const obtenerClientes = async () => {
    const { data } = await supabase
      .from('clientes')
      .select('*')
      .order('id', { ascending: false })

    if (data) setClientes(data)
  }

  const guardarCliente = async () => {
    if (!nombre) return alert('Nombre requerido')

    const { error } = await supabase
      .from('clientes')
      .insert([
        {
          nombre,
          telefono,
          correo,
        },
      ])

    if (error) {
      alert(error.message)
    } else {
      alert('Cliente guardado')

      setNombre('')
      setTelefono('')
      setCorreo('')

      obtenerClientes()
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Clientes
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Nuevo Cliente
        </h2>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Nombre"
            className="border p-3 rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Teléfono"
            className="border p-3 rounded"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <input
            type="email"
            placeholder="Correo"
            className="border p-3 rounded"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <button
            onClick={guardarCliente}
            className="bg-black text-white p-3 rounded"
          >
            Guardar Cliente
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">
          Lista de Clientes
        </h2>

        <div className="space-y-4">
          {clientes.map((cliente) => (
            <div
              key={cliente.id}
              className="border p-4 rounded"
            >
              <p><strong>{cliente.nombre}</strong></p>
              <p>{cliente.telefono}</p>
              <p>{cliente.correo}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}