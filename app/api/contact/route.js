import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('🔧 API Route called');
    
    let body;
    try {
      body = await request.json();
      console.log('📝 Request body received');
    } catch (parseError) {
      console.error('❌ Error parsing JSON:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // Debug environment variables
    console.log('🔧 Environment variables check:', {
      EMAIL_USER: process.env.EMAIL_USER ? `Set` : 'Not set',
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set',
      NODE_ENV: process.env.NODE_ENV
    });

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    console.log('✅ All validations passed');

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('❌ Email credentials not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('📧 Attempting to send email...');

    try {
      // Dynamically import nodemailer to avoid Turbopack issues
      const nodemailer = (await import('nodemailer')).default;
      
      // Create nodemailer transporter with Gmail configuration
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Verify transporter configuration
      console.log('🔧 Verifying email configuration...');
      await transporter.verify();
      console.log('✅ Email configuration verified');

      // Email content
      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">New Contact Form Submission</h2>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #666; margin-top: 20px;">
              This message was sent from your portfolio contact form.
            </p>
          </div>
        `,
        text: `New contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      // Send email
      console.log('📤 Sending email...');
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully! Message ID:', info.messageId);
      
      return NextResponse.json(
        { message: 'Message sent successfully! I\'ll get back to you soon.' },
        { status: 200 }
      );

    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      
      // More specific error messages
      let errorMessage = 'Failed to send message. Please try again later.';
      
      if (emailError.code === 'EAUTH') {
        errorMessage = 'Email authentication failed. Please check your email app password.';
        console.error('🔐 Authentication error - check your Gmail app password');
      } else if (emailError.code === 'ECONNECTION') {
        errorMessage = 'Unable to connect to email service. Please check your internet connection.';
      } else if (emailError.message) {
        errorMessage = `Email error: ${emailError.message}`;
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Unexpected error in API route:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        debug: error.message 
      },
      { status: 500 }
    );
  }
}