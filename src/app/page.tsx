import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import PrestigeSection from "@/components/PrestigeSection";
import HeritageSection from "@/components/HeritageSection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        <PrestigeSection />
        <HeritageSection />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
}
