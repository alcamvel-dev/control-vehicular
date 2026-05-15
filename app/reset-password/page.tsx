'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {

  const [password, setPassword] =
    useState('')

  async function cambiarPassword() {

    const { error } =
      await supabase.auth.updateUser({

        password,

      })

    if (error) {

      alert(error.message)

    } else {

      alert(
        'Contraseña actualizada'
      )

      window.location.href =
        '/login'

    }

  }

  return (

    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">

          Nueva Contraseña

        </h1>

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <button
          onClick={cambiarPassword}
          className="w-full bg-black text-white p-3 rounded"
        >
          Guardar Contraseña
        </button>

      </div>

    </main>

  )

}