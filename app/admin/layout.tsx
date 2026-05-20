import './globals.css'

export const metadata = {
  title: 'Control Vehicular',
  description: 'Sistema empresarial de control vehicular',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <html lang="es">

      <body>

        {children}

      </body>

    </html>

  )

}