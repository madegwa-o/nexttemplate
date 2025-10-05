'use client'

import { useActionState } from 'react'
import { sendEmail } from '@/actions/emailaction'

const initialState = { success: false, message: '' }

export default function ContactForm() {
    const [state, formAction] = useActionState(sendEmail, initialState)

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>

                <form action={formAction} className="space-y-4">
                    {state.message && (
                        <div className={`p-3 rounded-lg ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {state.message}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            Subject
                        </label>
                        <input
                            name="subject"
                            type="text"
                            id="subject"
                            required
                            placeholder="Welcome to Malipo Agents"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            required
                            rows={5}
                            placeholder="Your message here..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}