import axios from "axios";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const res = await axios.post("http://localhost:5000/api/send-email", data);

    if (res.data.success) {
      return {
        success: true,
        message: res.data.message || "Email sent successfully!",
      };
    } else {
      return {
        success: false,
        message: res.data.message || "Failed to send email",
      };
    }
  } catch (error) {
    console.error("Error sending contact email:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
