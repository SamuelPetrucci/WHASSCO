import HeroCarousel from "@/components/HeroCarousel";
import Mission from "@/components/Mission";
import Programs from "@/components/Programs";
import HistoryPreview from "@/components/HistoryPreview";
import BoardPreview from "@/components/BoardPreview";
import Impact from "@/components/Impact";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Mission />
      <Programs />
      <HistoryPreview />
      <BoardPreview />
      <Impact />
      <CTA />
    </>
  );
}
