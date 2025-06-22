import Banner from "@/components/home/Banner";
import FaqSection from "@/components/home/FaqSection";
import LatestNews from "@/components/home/LatestNews";
import PopularPracticeSets from "@/components/home/PopularPracticeSets";
import PricingPlans from "@/components/home/PricingPlans";
import SuccessStories from "@/components/home/SuccessStories";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Banner />
      <WhyChooseUs />
      <LatestNews />
      <PopularPracticeSets />
      <SuccessStories />
      <PricingPlans />
      <FaqSection />
    </main>
  );
}
