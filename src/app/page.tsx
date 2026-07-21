import { Hero } from "@/components/home/Hero";
import { Section2 } from "@/components/home/Section2";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Section2 />
    </>
  );
}
