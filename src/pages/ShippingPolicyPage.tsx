
import React from "react";
import Layout from "@/components/Layout";

const ShippingPolicyPage = () => {
  return (
    <Layout>
      <div className="max-container py-16">
        <h1 className="text-3xl font-display font-bold mb-8">
          Shipping Policy
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Shipping Methods</h2>
            <p className="mb-4">We offer the following shipping methods for all orders within India:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Standard Shipping (4-7 business days): ₹99 or FREE on orders over ₹1,000</li>
              <li>Express Shipping (2-3 business days): ₹199</li>
              <li>Next Day Delivery (order by 12pm IST, select metros only): ₹399</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">International Shipping</h2>
            <p>We currently ship to select countries in South Asia, including Nepal, Bhutan, Bangladesh, and Sri Lanka. International shipping rates and delivery times vary by location. All duties, taxes, and customs fees are the responsibility of the customer and are not included in the shipping cost.</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Order Processing</h2>
            <p>Orders are typically processed within 1-2 business days. Once your order ships, you will receive a shipping confirmation email with tracking information. Please note that tracking information may take up to 24 hours to update after shipment.</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Shipping Restrictions</h2>
            <p>Some larger items may have shipping restrictions to certain regions or may require additional shipping fees. These will be clearly indicated on the product page. We do not ship to Lakshadweep, and certain remote areas may experience longer delivery timeframes.</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Delivery Issues</h2>
            <p>If your package appears damaged upon delivery, please refuse the shipment or note the damage when signing. Contact our customer service team immediately with photos of the damaged package at support@flexfitness.com or call us at +91 1140851401.</p>
          </div>
          
          <div className="mt-12 p-6 bg-secondary/30 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Have questions?</h3>
            <p>
              If you have any questions about our shipping policy,
              please <a href="/contact" className="text-primary hover:underline">contact us</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicyPage;
