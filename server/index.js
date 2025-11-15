import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
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

    res.json({ 
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
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' })
})

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur le port ${PORT}`)
})

