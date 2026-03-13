import Image from "next/image";
import type { StaticPageContent } from "@/lib/content-types";

interface EditablePageLayoutProps {
  content: StaticPageContent;
  /** Optional content below the main body (e.g. form for Donate/Contact). */
  children?: React.ReactNode;
}

export default function EditablePageLayout({ content, children }: EditablePageLayoutProps) {
  const { heroImage, heroTitle, heroSubtitle, body } = content;
  const hasHeroImage = (heroImage?.trim() ?? "").length > 0;

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 flex flex-col items-center justify-center px-6 overflow-hidden">
        {hasHeroImage ? (
          <Image
            src={heroImage!}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-african-gold-500" aria-hidden />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/80 via-primary-600/70 to-african-gold-600/60" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {heroTitle || " "}
          </h1>
          {heroSubtitle && (
            <p className="text-lg md:text-xl text-white/90 mt-2 max-w-2xl mx-auto">
              {heroSubtitle}
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          {body?.trim() ? (
            <div
              className="cms-body prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
