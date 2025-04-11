
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
  // For now, we'll just simulate sending an email and log it to the console
  
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
  
  // Simulate a network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};
