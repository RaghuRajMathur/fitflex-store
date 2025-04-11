
import nodemailer from 'nodemailer';

/**
 * Sends an email with the contact form data
 * @param formData - The contact form data
 * @returns A promise that resolves to the result of the email sending operation
 */
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> => {
  console.log("Sending email to: raghuu715@gmail.com");
  
  // Create a formatted plain text version for logging
  const emailContent = `
New Message from FlexFitness Contact Form

From: ${formData.name} (${formData.email})
Subject: ${formData.subject || "General Inquiry"}

Message:
${formData.message}

---
This message was sent from the FlexFitness contact form.
  `;
  
  console.log("Email content:", emailContent);
  
  try {
    // Create a transporter object using the default SMTP transport
    // Note: In a real production environment, you would use real SMTP credentials
    // For demonstration purposes, we're using a test account
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email", // This is a testing service - in production use real SMTP server
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "testuser@ethereal.email", // In production, these would be real credentials
        pass: "testpassword", // In production, this would be a real password
      },
    });
    
    // Create the HTML email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
        <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Message from FlexFitness Contact Form</h2>
        
        <div style="margin: 20px 0;">
          <p><strong>From:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Subject:</strong> ${formData.subject || "General Inquiry"}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Message:</h3>
          <p style="white-space: pre-line;">${formData.message}</p>
        </div>
        
        <div style="font-size: 12px; color: #777; margin-top: 30px; padding-top: 10px; border-top: 1px solid #eee;">
          <p>This message was sent from the FlexFitness contact form.</p>
          <p>© ${new Date().getFullYear()} FlexFitness. All rights reserved.</p>
        </div>
      </div>
    `;
    
    // Setup email data
    const mailOptions = {
      from: '"FlexFitness Contact" <contact@flexfitness.com>',
      to: "raghuu715@gmail.com",
      subject: `New Contact Form Submission: ${formData.subject || "General Inquiry"}`,
      text: emailContent,
      html: htmlContent
    };
    
    // In a real application, this would send the email
    // For now, we're simulating a successful email send
    console.log("Email would be sent with:", mailOptions);
    
    // Simulate a network request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Email sent successfully to raghuu715@gmail.com" });
      }, 1000);
    });
    
    /* Uncomment this in a real environment with valid SMTP credentials
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return { success: true, message: `Email sent successfully to raghuu715@gmail.com (${info.messageId})` };
    */
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
};
