export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-6">
        Sistema de Control Vehicular
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Panel Principal
        </h2>

        <p className="mb-2">
          Bienvenido al sistema de gestión vehicular.
        </p>

        <ul className="list-disc pl-5 space-y-2">
          <li>Registro de clientes</li>
          <li>Subida de documentos</li>
          <li>Timeline de trámites</li>
          <li>Control de vencimientos</li>
          <li>Expedientes digitales</li>
        </ul>
      </div>
    </main>
  );
}