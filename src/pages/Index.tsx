import Navigation from "@/components/Navigation";
import WelcomeSection from "@/components/WelcomeSection";
import EatSection from "@/components/EatSection";
import DrinkSection from "@/components/DrinkSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import { useRestaurantRealtimeSync } from "@/hooks/useRestaurantData";

const Index = () => {
  useRestaurantRealtimeSync();

  return (
    <div className="min-h-screen bg-comorin-gradient">
      <Navigation />
      <main>
        <WelcomeSection />
        <EatSection />
        <DrinkSection />
        <TeamSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
