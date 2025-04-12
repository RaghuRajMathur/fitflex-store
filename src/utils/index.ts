
/**
 * Utility function to safely parse a Razorpay payment response
 * and normalize it for our application
 */
export const parseRazorpayResponse = (response: any) => {
  if (!response) return null;
  
  return {
    paymentId: response.razorpay_payment_id || null,
    orderId: response.razorpay_order_id || null,
    signature: response.razorpay_signature || null
  };
};

/**
 * Utility function to handle payment completion
 * and return a normalized result
 */
export const handlePaymentCompletion = (response: any) => {
  const parsedResponse = parseRazorpayResponse(response);
  
  return {
    success: !!parsedResponse?.paymentId,
    paymentId: parsedResponse?.paymentId || '',
    message: parsedResponse?.paymentId ? 'Payment successful' : 'Payment failed'
  };
};
