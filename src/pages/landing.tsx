import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { CharacterShowcase } from "@/components/sections/character-showcase";
import { StoryFlow } from "@/components/sections/story-flow";
import { CtaBanner } from "@/components/sections/cta-banner";

export const Landing = () => {
  return (
    <>
      <Hero />
      <Stats />
      <CharacterShowcase />
      <StoryFlow />
      <CtaBanner />
    </>
  );
};
