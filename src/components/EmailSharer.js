import React, { useState } from 'react';
import axios from 'axios';

const EmailSharer = ({ summary }) => {
    const [recipients, setRecipients] = useState('');
    const [subject, setSubject] = useState('Meeting Summary');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSendEmail = async () => {
        if (!recipients.trim()) {
            alert('Please enter at least one recipient email.');
            return;
        }

        const emailList = recipients.split(',').map(email => email.trim()).filter(email => email);

        setSending(true);
        try {
           await axios.post('https://ai-summarizer-backend-dpqz.onrender.com/api/email', {
                recipients: emailList,
                subject,
                summary
            });
            setSent(true);
            setTimeout(() => setSent(false), 3000);
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="glass rounded-xl p-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 3: Share Summary</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-gray-800 mb-2">Recipients (comma-separated):</label>
                    <input
                        type="text"
                        value={recipients}
                        onChange={(e) => setRecipients(e.target.value)}
                        placeholder="email1@example.com, email2@example.com"
                        className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-all duration-300"
                    />
                </div>

                <div>
                    <label className="block text-gray-800 mb-2">Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-all duration-300"
                    />
                </div>

                <button
                    onClick={handleSendEmail}
                    disabled={sending || !recipients.trim()}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                        sending || !recipients.trim()
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : sent
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-800 text-white hover:bg-gray-900 hover:scale-105'
                    }`}
                >
                    {sending ? 'Sending...' : sent ? 'Email Sent! ✓' : 'Send Email'}
                </button>
            </div>
        </div>
    );
};

export default EmailSharer;
