import { Router } from 'express'
import nodemailer from 'nodemailer'
import Contact from '../models/Contact.js'

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'name, email, and message are required' })
  }

  try {
    const contact = await Contact.create({ name, email, message })

    if (process.env.MAIL_HOST && process.env.MAIL_USER && process.env.MAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      })

      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.MAIL_FROM || process.env.MAIL_USER}>`,
        to: process.env.MAIL_TO || process.env.MAIL_USER,
        subject: `New contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }

      transporter.sendMail(mailOptions).catch((err) => {
        console.error('Failed to send email notification', err)
      })
    }

    res.status(201).json({ message: 'Contact stored', contactId: contact._id })
  } catch (err) {
    console.error('Failed to store contact', err)
    res.status(500).json({ message: 'Failed to store contact' })
  }
})

export default router

