
import React from "react";
import Layout from "@/components/Layout";

const ReturnPolicyPage = () => {
  return (
    <Layout>
      <div className="max-container py-16">
        <h1 className="text-3xl font-display font-bold mb-8">
          Return Policy
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Return Eligibility</h2>
            <p className="mb-4">We accept returns of unused, undamaged items in their original packaging within 7 days of delivery for most products. The following conditions apply:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Item must be in original condition with all tags, manuals, and accessories</li>
              <li>Original packaging must be intact and undamaged</li>
              <li>Proof of purchase (order number or receipt) is required</li>
              <li>Personalized or custom-made items cannot be returned unless defective</li>
              <li>Nutritional supplements, food items, and intimate wear cannot be returned once opened</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Return Process</h2>
            <p className="mb-4">To initiate a return, please follow these steps:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact our customer service team to obtain a Return Merchandise Authorization (RMA) number</li>
              <li>Package the item securely in its original packaging</li>
              <li>Include the RMA number and your order information</li>
              <li>Ship the package to the address provided by customer service</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Refunds</h2>
            <p>Once we receive and inspect your return, we will process your refund. Refunds are issued to the original payment method and typically take 5-10 business days to appear on your statement. For UPI and Net Banking payments, refunds may take 7-14 business days. Shipping costs are non-refundable unless the return is due to our error or a defective product.</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Exchanges</h2>
            <p>If you wish to exchange an item for a different size or model, please indicate this when requesting your RMA. We will provide instructions for the exchange process. Due to inventory limitations, we cannot guarantee the availability of exchange items.</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Damaged or Defective Items</h2>
            <p>If you receive a damaged or defective item, please contact us within 48 hours of delivery. We will arrange for a replacement or refund at our expense. Please note that we may request photos of the damaged item to expedite the process.</p>
          </div>
          
          <div className="mt-12 p-6 bg-secondary/30 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Have questions?</h3>
            <p>
              If you have any questions about our return policy,
              please <a href="/contact" className="text-primary hover:underline">contact us</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReturnPolicyPage;
