import { getContent } from "@/lib/content";
import HeroCarousel from "@/components/HeroCarousel";
import Mission from "@/components/Mission";
import Programs from "@/components/Programs";
import HistoryPreview from "@/components/HistoryPreview";
import BoardPreview from "@/components/BoardPreview";
import CTA from "@/components/CTA";

export default async function Home() {
  const content = await getContent();
  return (
    <>
      <HeroCarousel slides={content.heroSlides} />
      <Mission />
      <Programs />
      <HistoryPreview />
      <BoardPreview />
      <CTA />
    </>
  );
}
