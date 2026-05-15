'use client'

import { useRouter }
from 'next/navigation'

import { useState }
from 'react'

import { supabase }
from '@/lib/supabase'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const handleLogin = async (
    e: any
  ) => {

    e.preventDefault()

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      })

    if (error) {

      alert(error.message)

    } else {

      alert('LOGIN EXITOSO')

    }

  }

  return (

    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          Iniciar Sesión
        </h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded"
        >
          Entrar
        </button>

      </div>

    </main>

  )

}