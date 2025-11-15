import sgMail from '@sendgrid/mail'

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Méthode non autorisée' 
    })
  }

  try {
    const { name, email, phone, subject, message } = req.body

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Tous les champs obligatoires doivent être remplis' 
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Adresse email invalide' 
      })
    }

    // Prepare email content
    const emailContent = `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Téléphone:</strong> ${phone || 'Non renseigné'}</p>
      <p><strong>Sujet:</strong> ${subject}</p>
      <hr>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `

    // Send email via SendGrid
    const msg = {
      to: 'chougoulat78@gmail.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com',
      subject: `Nouveau message de contact: ${subject}`,
      text: `
Nouveau message de contact

Nom: ${name}
Email: ${email}
Téléphone: ${phone || 'Non renseigné'}
Sujet: ${subject}

Message:
${message}
      `,
      html: emailContent,
    }

    await sgMail.send(msg)

    res.status(200).json({ 
      success: true, 
      message: 'Message envoyé avec succès' 
    })
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.' 
    })
  }
}

