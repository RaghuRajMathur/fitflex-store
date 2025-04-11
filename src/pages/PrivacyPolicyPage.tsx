
import React from "react";
import Layout from "@/components/Layout";

const PrivacyPolicyPage = () => {
  return (
    <Layout>
      <div className="max-container py-16">
        <h1 className="text-3xl font-display font-bold mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="mb-4">We collect the following types of information when you use our website or services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal Information: Name, email address, shipping/billing address, phone number</li>
              <li>Payment Information: Credit/debit card details, UPI IDs (processed securely through our payment processor)</li>
              <li>Account Information: Login credentials, purchase history, product preferences</li>
              <li>Browsing Information: IP address, browser type, device information, cookies</li>
              <li>KYC Information: For certain high-value transactions, we may collect government ID proofs as required by Indian regulations</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
            <p className="mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your order or account</li>
              <li>Send you marketing communications (if you've opted in)</li>
              <li>Improve our website, products, and services</li>
              <li>Detect and prevent fraud or unauthorized access</li>
              <li>Comply with legal obligations under Indian law, including tax and consumer protection regulations</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Information Sharing</h2>
            <p className="mb-4">We do not sell, rent, or trade your personal information to third parties for marketing purposes. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who help us operate our business (payment processors, shipping companies)</li>
              <li>Legal authorities when required by law</li>
              <li>Affiliated businesses that provide services on our behalf</li>
              <li>Government agencies when required for compliance with Indian regulations</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All payment information is encrypted during transmission and storage. We comply with applicable data protection standards under Indian law.</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
              <li>Lodge a complaint with appropriate authorities</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. For example, we maintain certain transaction records for the period required by tax and accounting regulations in India.</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Cookies Policy</h2>
            <p>Our website uses cookies to enhance your browsing experience. You can manage your cookie preferences through your browser settings. We use cookies to remember your preferences, understand how you interact with our website, and improve your overall experience.</p>
          </div>
          
          <div className="mt-12 p-6 bg-secondary/30 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Have questions?</h3>
            <p>
              If you have any questions about our privacy policy,
              please <a href="/contact" className="text-primary hover:underline">contact us</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
