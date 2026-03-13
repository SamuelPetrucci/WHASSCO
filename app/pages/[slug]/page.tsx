import Image from "next/image";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContent();
  const page = content.customPages.find((p) => p.slug === slug);
  if (!page) return { title: "Page not found" };
  return { title: `${page.title} | WHAASCO` };
}

export default async function CustomPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContent();
  const page = content.customPages.find((p) => p.slug === slug);
  if (!page) notFound();

  const hasHeroImage = page.heroImage?.trim().length > 0;

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 flex flex-col items-center justify-center px-6 overflow-hidden">
        {hasHeroImage ? (
          <Image
            src={page.heroImage}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-african-black-900" aria-hidden />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/80 via-primary-600/70 to-african-gold-600/60" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {page.title || "Page"}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          {page.body?.trim() ? (
            <div
              className="cms-body prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: page.body }}
            />
          ) : (
            <p className="text-gray-600">No content yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
