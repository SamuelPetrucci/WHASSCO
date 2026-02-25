"use client";

import { useState } from "react";

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount.toString());
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setDonationAmount("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount || donationAmount;
    if (!amount) {
      alert("Please select or enter a donation amount");
      return;
    }

    // Redirect to secure donation platform
    // Configure NEXT_PUBLIC_DONATION_LINK in .env.local
    // Options: PayPal, Stripe, Givebutter, Network for Good, etc.
    const donationLink = process.env.NEXT_PUBLIC_DONATION_LINK;
    
    if (donationLink && donationLink !== "#") {
      // If your donation platform accepts amount as URL parameter:
      // window.location.href = `${donationLink}?amount=${amount}`;
      // Otherwise, redirect to the donation page:
      window.location.href = donationLink;
    } else {
      // Fallback for development - shows message and logs donation info
      console.log("Donation submission:", { amount, formData: "collected" });
      alert(
        `Thank you for your donation of $${amount}! Please contact us at info@whaasco.org to complete your donation, or configure NEXT_PUBLIC_DONATION_LINK in your environment variables.`
      );
    }
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Support Our Mission
          </h1>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Your donation supports WHAASCO's mission to strengthen families, uplift youth, and celebrate African American culture. Contributions help fund educational enrichment, cultural programming, and community outreach that create meaningful opportunities and lasting impact. Every gift—large or small—helps us continue serving our community.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Amount
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`px-4 py-2 border-2 rounded-lg font-semibold transition-colors ${
                        donationAmount === amount.toString()
                          ? "border-primary-600 bg-primary-50 text-primary-600"
                          : "border-gray-300 text-gray-700 hover:border-primary-500"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter custom amount
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Donor Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg"
                >
                  Donate Now
                </button>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Your donation is secure and tax-deductible. We accept all major
                  credit cards.
                </p>
              </div>
            </form>
          </div>
          <div className="mt-8 bg-primary-50 p-6 rounded-lg border-l-4 border-african-gold-500">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Other Ways to Give
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Donate online via Zeffy (link coming soon)</li>
              <li>• Mail a check to our office (PO Box 370024, West Hartford, CT 06137-0024)</li>
              <li>• Set up a recurring monthly donation</li>
              <li>• Donate through your employer&apos;s matching program</li>
              <li>• Volunteer your time and skills</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
