import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      message,
      projectDetails = {}
    } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const {
      projectType = 'Website',
      features = [],
      designPackage = 'None',
      timeframe = 'Standard',
      maintenance = false,
      estimatedCost = 0,
      monthlyMaintenance = 0
    } = projectDetails;

    // 1. Send email to site owner
    const ownerEmailResult = await resend.emails.send({
      from: 'onboarding@casa-dev.com',
      to: 'tronsymphony@gmail.com',
      subject: `New Project Quote Request: ${projectType}`,
      html: `
        <h2>New Project Quote Request</h2>
        <p><strong>From:</strong> ${name || 'Anonymous'} (${email})</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Design Package:</strong> ${designPackage}</p>
        <p><strong>Selected Features:</strong> ${features.join(', ') || 'None'}</p>
        <p><strong>Timeframe:</strong> ${timeframe}</p>
        <p><strong>Maintenance Plan:</strong> ${maintenance ? 'Yes' : 'No'}</p>
        <p><strong>Estimated Cost:</strong> $${estimatedCost.toLocaleString()}</p>
        ${maintenance ? `<p><strong>Monthly Maintenance:</strong> $${monthlyMaintenance}/month</p>` : ''}
        <h3>Client Message:</h3>
        <p>${message || 'No additional message'}</p>
      `
    });

    if (ownerEmailResult.error) {
      console.error('Resend API error:', ownerEmailResult.error);
    }

    // 2. Send confirmation email to client
    await resend.emails.send({
      from: 'onboarding@casa-dev.com',
      to: email,
      subject: 'Your Project Quote Request has been received',
      html: `
        <h2>Thank you for your interest!</h2>
        <p>Hello ${name || 'there'},</p>
        <p>I've received your request for a quote on your ${projectType} project. 
           I'll review your requirements and get back to you with a detailed quote within one business day.</p>
        <h3>Your Project Details:</h3>
        <p><strong>Design Package:</strong> ${designPackage}</p>
        <p><strong>Estimated Cost:</strong> $${estimatedCost.toLocaleString()}</p>
        <p><strong>Timeframe:</strong> ${timeframe}</p>
        ${maintenance ? `<p><strong>Monthly Maintenance:</strong> $${monthlyMaintenance}/month</p>` : ''}
        <p>If you have any questions in the meantime, feel free to reply to this email.</p>
        <p>Best regards,</p>
        <p>Casa Dev</p>
      `
    });

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({
      error: 'Failed to send email',
      details: error.message
    }, { status: 500 });
  }
}
