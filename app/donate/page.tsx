import { getContent, hasStaticPageContent } from "@/lib/content";
import EditablePageLayout from "@/components/EditablePageLayout";
import DonateForm from "@/components/DonateForm";

export default async function DonatePage() {
  const content = await getContent();
  const pageContent = content.staticPageContent?.donate;

  const donationLink = (content.donationLink ?? "").trim() || undefined;

  if (pageContent && hasStaticPageContent(pageContent)) {
    return (
      <EditablePageLayout content={pageContent}>
        <div className="mt-8">
          <DonateForm donationLink={donationLink} />
        </div>
      </EditablePageLayout>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Support Our Mission
          </h1>
          <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Your donation supports WHAASCO&apos;s mission to strengthen families, uplift youth, and celebrate African American culture. Contributions help fund educational enrichment, cultural programming, and community outreach that create meaningful opportunities and lasting impact. Every gift—large or small—helps us continue serving our community.
          </p>
          <DonateForm donationLink={donationLink} />
        </div>
      </div>
    </div>
  );
}
