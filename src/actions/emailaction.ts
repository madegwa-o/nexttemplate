'use server'

import nodemailer from 'nodemailer'

type FormState = {
    success: boolean;
    message: string;
}


export async function sendEmail(prevState: FormState, formData: FormData) {
    try {
        const email = formData.get('email')
        const message = formData.get('message')
        const subject = formData.get('subject')

        if (!email || !message || !subject || typeof email !== 'string' || typeof message !== 'string' || typeof subject !== 'string') {
            return { success: false, message: 'Invalid form data' }
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            text: message,
        })

        return { success: true, message: 'Email sent successfully!' }
    } catch (error) {
        return { success: false, message: 'Failed to send email' }
    }
}