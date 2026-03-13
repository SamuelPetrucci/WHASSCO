import { getContent } from "@/lib/content";
import HeroCarousel from "@/components/HeroCarousel";
import Mission from "@/components/Mission";
import Programs from "@/components/Programs";
import HistoryPreview from "@/components/HistoryPreview";
import BoardPreview from "@/components/BoardPreview";
import CTA from "@/components/CTA";

export default async function Home() {
  const content = await getContent();
  const home = content.home;
  return (
    <>
      <HeroCarousel slides={content.heroSlides} />
      <Mission home={home} />
      <Programs home={home} />
      <HistoryPreview />
      <BoardPreview />
      <CTA home={home} />
    </>
  );
}
