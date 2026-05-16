'use client'

import { useState } from 'react'
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

}
  Volkswagen: [
    'Jetta',
    'Golf',
    'Tiguan',
    'Virtus',
  
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
  const [placas, setPlacas] = useState('')
  Sconst [anio, setAnio] = useState('')

  useEffect(() => {
    obtenerClientes()
    obtenerVehiculos()
  }, [])

  const obtenerClientes = async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')

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

    if (!clienteId) {
      return alert('Selecciona un cliente')
    }

    const { error } = await supabase
      .from('vehiculos')
      .insert([
        {
          cliente_id: clienteId,
          marca,
          modelo,
          placas,
          anio: Number(anio)
        }
      ])

    if (error) {
      alert(error.message)
    } else {

      alert('Vehículo registrado')

      setClienteId('')
      setMarca('')
      setModelo('')
      setPlacas('')
      setAnio('')

      obtenerVehiculos()
    }
  }
     
      async function guardarVehiculo() {

  const { error } =
    await supabase
      .from('vehiculos')
      .insert([

        {
          cliente: clienteId,
          marca,
          modelo,
          placas,
          anio,
        }

      ])

  if (error) {

    alert(error.message)

  } else {

    alert('Vehículo guardado')

    setClienteId('')
    setMarca('')
    setModelo('')
    setPlacas('')
    setAnio('')

  }

}
  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Registro de Vehículos
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-semibold mb-4">
          Nuevo Vehículo
        </h2>

        <div className="grid gap-4">

          <select
            className="border p-3 rounded"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
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

          <select
  value={marca}
  onChange={(e) =>
    setMarca(e.target.value)
  }
  className="border p-3 rounded"
>

  <option value="">
    Selecciona una marca
  </option>

  <option value="Audi">
    Audi
  </option>

  <option value="BMW">
    BMW
  </option>

  <option value="Chevrolet">
    Chevrolet
  </option>

  <option value="Ford">
    Ford
  </option>

  <option value="Honda">
    Honda
  </option>

  <option value="Hyundai">
    Hyundai
  </option>

  <option value="Kia">
    Kia
  </option>

  <option value="Mazda">
    Mazda
  </option>

  <option value="Mercedes-Benz">
    Mercedes-Benz
  </option>

  <option value="Nissan">
    Nissan
  </option>

  <option value="Seat">
    Seat
  </option>

  <option value="Toyota">
    Toyota
  </option>

  <option value="Volkswagen">
    Volkswagen
  </option>

</select>
          
          <select
  value={modelo}
  onChange={(e) =>
    setModelo(e.target.value)
  }
  className="border p-3 rounded"
>

  <option value="">
    Selecciona modelo
  </option>

  {modelosPorMarca[marca]?.map(
    (item: string) => (

      <option
        key={item}
        value={item}
      >
        {item}
      </option>

    )
  )}

</select>
          <input
            type="text"
            placeholder="Placas"
            className="border p-3 rounded"
            value={placas}
            onChange={(e) => setPlacas(e.target.value)}
          />

          <input
            type="number"
            placeholder="Año"
            className="border p-3 rounded"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
          />

          <button
            onClick={guardarVehiculo}
            className="bg-black text-white p-3 rounded"
          >
            Guardar Vehículo

          <button
            onClick={guardarVehiculo}
            className="w-full bg-black text-white p-3 rounded"
           >
               Guardar Vehículo
             </button>
        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-semibold mb-4">
          Lista de Vehículos
        </h2>

        <div className="space-y-4">

          {vehiculos.map((vehiculo) => (

            <div
              key={vehiculo.id}
              className="border p-4 rounded"
            >

              <p>
                <strong>
                ID: {vehiculo.id} —    
                  {vehiculo.marca} {vehiculo.modelo}
                </strong>
              </p>

              <p>
                Placas: {vehiculo.placas}
              </p>

              <p>
                Año: {vehiculo.anio}
              </p>

              <p>
                Cliente: {vehiculo.clientes?.nombre}
              </p>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}