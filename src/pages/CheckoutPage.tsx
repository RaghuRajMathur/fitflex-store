
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useStore } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import LazyImage from "@/components/LazyImage";
import { Check } from "lucide-react";

type CheckoutStep = "shipping" | "payment" | "confirmation";

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  
  // Calculate order details
  const subtotal = getCartTotal();
  const shipping = subtotal >= 100 ? 0 : 8.95;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateShippingForm = () => {
    const requiredFields = [
      "firstName", "lastName", "email", "address", "city", "state", "zipCode"
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Please enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    return true;
  };
  
  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateShippingForm()) {
      setCurrentStep("payment");
      window.scrollTo(0, 0);
    }
  };
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep("confirmation");
      clearCart();
      window.scrollTo(0, 0);
    }, 2000);
  };
  
  const handleBackToShopping = () => {
    navigate("/");
  };
  
  // Redirect if cart is empty (except in confirmation step)
  if (cart.length === 0 && currentStep !== "confirmation") {
    navigate("/cart");
    return null;
  }
  
  return (
    <Layout>
      <div className="max-container py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-4">Checkout</h1>
          
          {/* Checkout Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-full max-w-3xl grid grid-cols-3 gap-4">
              <div className={`text-center relative ${currentStep === "shipping" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto mb-2 border ${currentStep === "shipping" ? "border-primary bg-primary/10" : "border-border"}`}>
                  1
                </div>
                <span className="text-sm">Shipping</span>
                <div className="absolute top-4 left-1/2 w-full h-0.5 bg-border -z-10" />
              </div>
              
              <div className={`text-center relative ${currentStep === "payment" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto mb-2 border ${currentStep === "payment" ? "border-primary bg-primary/10" : "border-border"}`}>
                  2
                </div>
                <span className="text-sm">Payment</span>
                <div className="absolute top-4 left-0 w-full h-0.5 bg-border -z-10" />
              </div>
              
              <div className={`text-center relative ${currentStep === "confirmation" ? "text-primary font-medium" : "text-muted-foreground"}`}>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto mb-2 border ${currentStep === "confirmation" ? "border-primary bg-primary/10" : "border-border"}`}>
                  3
                </div>
                <span className="text-sm">Confirmation</span>
                <div className="absolute top-4 right-1/2 w-full h-0.5 bg-border -z-10" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {currentStep === "shipping" && (
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                
                <form onSubmit={handleContinueToPayment}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Postal Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}
            
            {currentStep === "payment" && (
              <div className="bg-card rounded-xl border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                
                <form onSubmit={handlePlaceOrder}>
                  <div className="mb-6">
                    <div className="flex items-center p-4 border rounded-lg mb-4">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        className="h-4 w-4 text-primary"
                        defaultChecked
                      />
                      <label htmlFor="paypal" className="ml-2 flex items-center">
                        <span className="font-medium">PayPal</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center p-4 border rounded-lg">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        className="h-4 w-4 text-primary"
                      />
                      <label htmlFor="cod" className="ml-2 flex items-center">
                        <span className="font-medium">Cash on Delivery</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg mb-6">
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">
                        By clicking "Place Order," you agree to our:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                        <li>Return Policy</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setCurrentStep("shipping")}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {currentStep === "confirmation" && (
              <div className="bg-card rounded-xl border shadow-sm p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-semibold mb-2">
                  Thank You for Your Order!
                </h2>
                
                <p className="text-muted-foreground mb-6">
                  Your order has been placed successfully.
                </p>
                
                <div className="bg-muted/50 rounded-lg p-4 mb-6 mx-auto max-w-md">
                  <div className="text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Order Number:</span>
                      <span className="text-muted-foreground">
                        #{Math.floor(100000 + Math.random() * 900000)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Order Date:</span>
                      <span className="text-muted-foreground">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span className="text-muted-foreground">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total:</span>
                      <span className="text-muted-foreground">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-8">
                  A confirmation email has been sent to {formData.email}.
                  You can track your order status in your account.
                </p>
                
                <Button onClick={handleBackToShopping}>
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-4 max-h-80 overflow-y-auto pr-2">
                {(currentStep === "confirmation" ? [] : cart).map((item) => (
                  <div key={item.product.id} className="flex items-start py-2">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-3 flex-shrink-0">
                      <LazyImage
                        src={item.product.image}
                        alt={item.product.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-muted-foreground mt-1">
                        Qty: {item.quantity}
                      </div>
                      <div className="text-sm font-medium mt-1">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
