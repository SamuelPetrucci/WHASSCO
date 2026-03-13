import { redirect } from "next/navigation";
import { getContent } from "@/lib/content";

export default async function DonatePage() {
  const content = await getContent();
  const donationLink = (content.donationLink ?? "").trim() || undefined;

  // If an external donation link is configured in Admin → Site pages,
  // send visitors directly to that third-party page (e.g. Givebutter).
  if (donationLink) {
    redirect(donationLink);
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Donations coming soon
          </h1>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Our online donation link is not configured yet. You&apos;ll be able to donate securely through our third‑party platform (such as Givebutter) once it is set up in the admin under <strong>Site pages → Donation link</strong>.
          </p>
          <p className="text-center text-gray-600">
            In the meantime, you can support WHAASCO by reaching out on our{" "}
            <a href="/contact" className="text-primary-600 underline hover:no-underline">
              contact page
            </a>
            {" "}
            or by mailing a contribution to PO Box 370024, West Hartford, CT 06137‑0024.
          </p>
        </div>
      </div>
    </div>
  );
}
