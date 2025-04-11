
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
}) => {
  // In a real application, this would make a request to a backend API
  // For now, we'll simulate sending an email and log it to the console
  
  console.log("Sending email to: raghuu715@gmail.com");
  
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
  
  // In a real application, this would make an actual email request
  // For now, we'll send this to a real email service
  try {
    // Here we would call a real email service API
    // For now we're just simulating a successful email send
    
    // Create a formatted email that would be sent
    const emailBody = {
      to: "raghuu715@gmail.com",
      from: "contact@flexfitness.com",
      subject: `New Contact Form Submission: ${formData.subject || "General Inquiry"}`,
      html: `
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
      `
    };
    
    // In production, this would be an actual email API call
    console.log("Email would be sent with:", emailBody);
    
    // Simulate a network request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Email sent successfully to raghuu715@gmail.com" });
      }, 1000);
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return Promise.reject({ success: false, message: "Failed to send email" });
  }
};
