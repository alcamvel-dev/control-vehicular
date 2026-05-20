'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {

   const { data: usuarios, error: userError } = await supabase
  .from('usuarios')
  .select('*')
  .eq('auth', userId)

console.log('USER ID:', userId)
console.log('USUARIOS:', usuarios)

if (userError || !usuarios || usuarios.length === 0) {

  return alert('Usuario sin permisos')

}

const usuario = usuarios[0]

    const userId = data.user.id

    const { data: usuario } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth', userId)
      .single()

    if (!usuario) {

      return alert('Usuario sin permisos')

    }

    if (usuario.rol === 'admin') {

      router.push('/admin')
      return

    }

    if (usuario.rol === 'cliente') {

      router.push('/portal')
      return

    }

  }

  return (

    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-black">
          LOGIN NUEVO
        </h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border border-gray-300 p-4 mb-4 rounded-lg text-black"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border border-gray-300 p-4 mb-6 rounded-lg text-black"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition"
        >
          Entrar
        </button>

      </div>

    </main>

  )

}