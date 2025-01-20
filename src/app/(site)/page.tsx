import Features from "@/components/home/Features";
import Header from "@/components/home/Header";
import HeroSecton from "@/components/home/HeroSecton";
import { auth } from "@clerk/nextjs/server";

const Home = async () => {
  const user = await auth();
  return (
    <main>
      <Header userId={user.userId} />
      <HeroSecton />
      <Features />
      <footer className="mt-5"></footer>
    </main>
  );
};

export default Home;
