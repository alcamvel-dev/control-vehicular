'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {

    // LOGIN SUPABASE
    const { data, error } = await supabase.auth.signInWithPassword({

      email,
      password,

    })

    // SI HAY ERROR
    if (error) {

      return alert(error.message)

    }

    // ID DEL USUARIO LOGEADO
    const userId = data.user.id

    console.log('USER ID:', userId)

    // BUSCAR USUARIO EN TABLA usuarios
    const { data: usuarios, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth', userId)

    console.log('USUARIOS:', usuarios)

    // SI NO EXISTE
    if (userError || !usuarios || usuarios.length === 0) {

      return alert('Usuario sin permisos')

    }

    // TOMAR PRIMER USUARIO
    const usuario = usuarios[0]

    // SI ES ADMIN
    if (usuario.rol === 'admin') {

      router.push('/admin')
      return

    }

    // SI ES CLIENTE
    if (usuario.rol === 'cliente') {

      router.push('/portal')
      return

    }

    // SI EL ROL NO EXISTE
    alert('Rol no válido')

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