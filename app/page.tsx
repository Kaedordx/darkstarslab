import Nav from "@/components/Nav";
import Hero from "@/components/scenes/Hero";
import Services from "@/components/scenes/Services";
import Work from "@/components/scenes/Work";
import Why from "@/components/scenes/Why";
import Closing from "@/components/scenes/Closing";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <Why />
        <Closing />
      </main>
    </>
  );
}
