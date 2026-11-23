import Hero from "@/components/home/Hero";
import Category from "@/components/home/Category";
import Featured from "@/components/home/Featured";
import How_it_work from "@/components/home/How_it_work";
import Join from "@/components/home/Join";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Category />
      <Featured />
      <How_it_work />
      <Join />
    </>
  );
}
