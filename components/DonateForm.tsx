"use client";

import { useState } from "react";

interface DonateFormProps {
  /** Override from admin (third-party donation URL). Falls back to NEXT_PUBLIC_DONATION_LINK if not set. */
  donationLink?: string;
}

export default function DonateForm({ donationLink: donationLinkProp }: DonateFormProps = {}) {
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

    const link = (donationLinkProp ?? "").trim() || process.env.NEXT_PUBLIC_DONATION_LINK;

    if (link && link !== "#") {
      window.location.href = link;
    } else {
      console.log("Donation submission:", { amount, formData: "collected" });
      alert(
        `Thank you for your donation of $${amount}! Please contact us at info@whaasco.org to complete your donation, or set the Donation link in Admin → Site pages.`
      );
    }
  };

  return (
    <>
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
    </>
  );
}
