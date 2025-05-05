// pages/api/send-email.js
import { Resend } from 'resend';

// Initialize Resend with API key (store this in .env.local in production)
const resend = new Resend(process.env.RESEND_API_KEY || 're_jWd6QQpt_KAcuwvPcqZhUJ4sPi8Ywn6xL');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      email,
      message,
      projectDetails
    } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // 1. Send email to you (site owner)
    const ownerEmailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'tronsymphony@gmail.com', // Your email
      subject: `New Project Quote Request: ${projectDetails.projectType}`,
      html: `
        <h2>New Project Quote Request</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Project Type:</strong> ${projectDetails.projectType}</p>
        <p><strong>Design Package:</strong> ${projectDetails.designPackage || 'None'}</p>
        <p><strong>Selected Features:</strong> ${projectDetails.features.join(', ') || 'None'}</p>
        <p><strong>Timeframe:</strong> ${projectDetails.timeframe}</p>
        <p><strong>Maintenance Plan:</strong> ${projectDetails.maintenance ? 'Yes' : 'No'}</p>
        <p><strong>Estimated Cost:</strong> $${projectDetails.estimatedCost.toLocaleString()}</p>
        ${projectDetails.maintenance ? 
          `<p><strong>Monthly Maintenance:</strong> $${projectDetails.monthlyMaintenance}/month</p>` : ''}
        <h3>Client Message:</h3>
        <p>${message || 'No additional message'}</p>
      `
    });

    // 2. Send confirmation email to client
    const clientEmailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email, // Client's email
      subject: 'Your Project Quote Request has been received',
      html: `
        <h2>Thank you for your interest!</h2>
        <p>Hello ${name},</p>
        <p>I've received your request for a quote on your ${projectDetails.projectType} project. 
           I'll review your requirements and get back to you with a detailed quote within one business day.</p>
        <h3>Your Project Details:</h3>
        <p><strong>Design Package:</strong> ${projectDetails.designPackage || 'None'}</p>
        <p><strong>Estimated Cost:</strong> $${projectDetails.estimatedCost.toLocaleString()}</p>
        <p><strong>Timeframe:</strong> ${projectDetails.timeframe}</p>
        ${projectDetails.maintenance ? 
          `<p><strong>Monthly Maintenance:</strong> $${projectDetails.monthlyMaintenance}/month</p>` : ''}
        <p>If you have any questions in the meantime, feel free to reply to this email.</p>
        <p>Best regards,</p>
        <p>Your Name</p>
      `
    });

    return res.status(200).json({ 
      success: true,
      message: 'Emails sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}