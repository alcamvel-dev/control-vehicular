'use client'

import { useState } from 'react'

export default function PortalPage() {

  const [seccion, setSeccion] =
    useState('vehiculos')

  return (

    <main className="flex min-h-screen bg-gray-100">

      {/* MENU LATERAL */}

      <aside className="w-72 bg-black text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          Portal Cliente
        </h1>

        <div className="flex flex-col gap-4">

          <button
            onClick={() =>
              setSeccion('vehiculos')
            }
            className="text-left p-3 rounded bg-zinc-900 hover:bg-zinc-700"
          >
            Mis Vehículos
          </button>

          <button
            onClick={() =>
              setSeccion('documentos')
            }
            className="text-left p-3 rounded bg-zinc-900 hover:bg-zinc-700"
          >
            Documentos
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
              setSeccion('timeline')
            }
            className="text-left p-3 rounded bg-zinc-900 hover:bg-zinc-700"
          >
            Timeline
          </button>

          <button
            onClick={() =>
              setSeccion('perfil')
            }
            className="text-left p-3 rounded bg-zinc-900 hover:bg-zinc-700"
          >
            Mi Perfil
          </button>

        </div>

      </aside>

      {/* CONTENIDO */}

      <section className="flex-1 p-10">

        {seccion === 'vehiculos' && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Mis Vehículos
            </h1>

            <div className="bg-white p-8 rounded-xl shadow">

              Aquí aparecerán los vehículos

            </div>

          </div>

        )}

        {seccion === 'documentos' && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Documentos
            </h1>

            <div className="bg-white p-8 rounded-xl shadow">

              Subida de documentos PDF

            </div>

          </div>

        )}

        {seccion === 'vencimientos' && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Vencimientos
            </h1>

            <div className="bg-white p-8 rounded-xl shadow">

              Alertas de trámites

            </div>

          </div>

        )}

        {seccion === 'timeline' && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Timeline
            </h1>

            <div className="bg-white p-8 rounded-xl shadow">

              Historial del vehículo

            </div>

          </div>

        )}

        {seccion === 'perfil' && (

          <div>

            <h1 className="text-5xl font-bold mb-10">
              Mi Perfil
            </h1>

            <div className="bg-white p-8 rounded-xl shadow">

              Datos del cliente

            </div>

          </div>

        )}

      </section>

    </main>

  )

}