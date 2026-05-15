'use client'

import { useState } from 'react'

export default function AdminPage() {

  const [seccion, setSeccion] =
    useState('dashboard')

  return (

    <main className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <aside className="w-72 bg-black text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          Control Vehicular
        </h1>

        <div className="flex flex-col gap-4">

          <button
            onClick={() =>
              setSeccion('dashboard')
            }
            className="text-left p-3 rounded bg-zinc-900 hover:bg-zinc-700"
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              setSeccion('clientes')
            }
            className="text-left p-3 rounded bg-zinc-900 hover:bg-zinc-700"
          >
            Clientes
          </button>

          <button
            onClick={() =>
              setSeccion('vehiculos')
            }
            className="text-left p-3 rounded bg-zinc-900 hover:bg-zinc-700"
          >
            Vehículos
          </button>

          <button
            onClick={() =>
              setSeccion('vencimientos')
            }
            className="text-left p-3 rounded bg-zinc-900 hover:bg-zinc-700"
          >
            Vencimientos
          </button>

          <button
            onClick={() =>
              setSeccion('documentos')
            }
            className="text-left p-3 rounded bg-zinc-900 hover:bg-zinc-700"
          >
            Documentos
          </button>

        </div>

      </aside>

      {/* CONTENIDO */}

      <section className="flex-1 p-10">

        {seccion === 'dashboard' && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">

              <div className="bg-white p-8 rounded-xl shadow">

                <h2 className="text-4xl font-bold">
                  15
                </h2>

                <p>
                  Clientes
                </p>

              </div>

              <div className="bg-white p-8 rounded-xl shadow">

                <h2 className="text-4xl font-bold">
                  48
                </h2>

                <p>
                  Vehículos
                </p>

              </div>

              <div className="bg-white p-8 rounded-xl shadow">

                <h2 className="text-4xl font-bold">
                  7
                </h2>

                <p>
                  Vencimientos
                </p>

              </div>

            </div>

          </div>

        )}

        {seccion === 'clientes' && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Clientes
            </h1>

            <div className="bg-white p-8 rounded-xl shadow">

              Tabla de clientes

            </div>

          </div>

        )}

        {seccion === 'vehiculos' && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Vehículos
            </h1>

            <div className="bg-white p-8 rounded-xl shadow">

              Tabla de vehículos

            </div>

          </div>

        )}

        {seccion === 'vencimientos' && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Vencimientos
            </h1>

            <div className="bg-white p-8 rounded-xl shadow">

              Alertas y vencimientos

            </div>

          </div>

        )}

        {seccion === 'documentos' && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Documentos
            </h1>

            <div className="bg-white p-8 rounded-xl shadow">

              Gestión documental

            </div>

          </div>

        )}

      </section>

    </main>

  )

}