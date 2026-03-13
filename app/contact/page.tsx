import { getContent, hasStaticPageContent } from "@/lib/content";
import EditablePageLayout from "@/components/EditablePageLayout";
import ContactForm from "@/components/ContactForm";

function ContactInfo() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Get in Touch
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
          <p className="text-gray-700">info@whaasco.org</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
          <p className="text-gray-700">
            PO Box 370024<br />
            West Hartford, CT 06137-0024
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Follow Us</h3>
          <p className="text-gray-700">
            <a href="https://www.facebook.com/WHAASCO" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-medium">Facebook</a>
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
          <p className="text-gray-700">
            Monday - Friday: 9:00 AM - 5:00 PM
            <br />
            Saturday: 10:00 AM - 2:00 PM
            <br />
            Sunday: Closed
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function ContactPage() {
  const content = await getContent();
  const pageContent = content.staticPageContent?.contact;

  if (pageContent && hasStaticPageContent(pageContent)) {
    return (
      <EditablePageLayout content={pageContent}>
        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <ContactInfo />
          <ContactForm />
        </div>
      </EditablePageLayout>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700 mb-12 text-center">
            We&apos;d love to hear from you. Get in touch with us using the form below or
            contact information provided.
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
