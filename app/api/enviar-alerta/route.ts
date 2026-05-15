import { Resend } from 'resend'

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  )

export async function POST() {

  try {

    await resend.emails.send({

      from:
        'onboarding@resend.dev',

      to:
        'alcamvel@gmail.com',

      subject:
        'Alerta de Vencimiento',

      html: `

        <h1>
          ⚠️ Documento próximo a vencer
        </h1>

        <p>
          El seguro del vehículo
          FA37285 vence en 5 días.
        </p>

      `
    })

    return Response.json({
      success: true
    })

  }
  catch (error) {

    return Response.json({
      success: false,
      error
    })

  }

}