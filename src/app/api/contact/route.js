import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, projectType, message, budget, timeframe } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields' },
        { status: 400 }
      );
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

    // Send the email using Resend to owner
    const { error: sendError } = await resend.emails.send({
      from: 'Contact Form <delivered@casa-dev.com>',
      to: 'delivered@casa-dev.com',
      subject: `New Project Inquiry: ${projectType || 'Website'} Project`,
      html: emailContent,
      reply_to: email,
    });

    if (sendError) {
      console.error('Resend API error:', sendError);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    // Send an auto-response to the user
    await resend.emails.send({
      from: 'Casa Dev <delivered@casa-dev.com>',
      to: email,
      subject: 'Thank you for your inquiry',
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>I've received your message about your ${projectType || 'website'} project and will review it shortly.</p>
        <p>I'll get back to you within 24 hours to discuss your needs in more detail.</p>
        <p>In the meantime, you can check out my portfolio at <a href="https://casa-dev.com">casa-dev.com</a> to see more examples of my work.</p>
        <p>Looking forward to potentially working with you!</p>
        <p>Best regards,<br>Casa Dev</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
