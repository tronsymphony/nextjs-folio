import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the request body
    const { name, email, projectType, message, budget, timeframe } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Name, email, and message are required fields' 
      });
    }
    
    // Format the email content with HTML
    const emailContent = `
      <h2>New Project Inquiry from ${name}</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
      ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
      ${timeframe ? `<p><strong>Timeframe:</strong> ${timeframe}</p>` : ''}
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;
    
    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <delivered@casa-dev.com>', // Update with your verified domain
      to: 'delivered@casa-dev.com', // Resend's testing email address
      subject: `New Project Inquiry: ${projectType || 'Website'} Project`,
      html: emailContent,
      reply_to: email,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({ 
        error: 'Failed to send email. Please try again.' 
      });
    }
    
    // Send an auto-response to the user
    await resend.emails.send({
      from: 'Your Name <delivered@casa-dev.com>', // Update with your verified domain
      to: email,
      subject: 'Thank you for your inquiry',
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>I've received your message about your ${projectType || 'website'} project and will review it shortly.</p>
        <p>I'll get back to you within 24 hours to discuss your needs in more detail.</p>
        <p>In the meantime, you can check out my portfolio at <a href="https://casa-dev.com">casa-dev.com</a> to see more examples of my work.</p>
        <p>Looking forward to potentially working with you!</p>
        <p>Best regards,<br>Your Name</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}