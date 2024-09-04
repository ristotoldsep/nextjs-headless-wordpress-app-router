import HomeHero from "@/components/HomeHero";

export const metadata = {
    title: 'NextJS Headless Wordpress',
    desciption: 'Headless Wordpress Site with NextJS front-end',
}

const Home = () => {

  return (
    <>
      <div className="min-h-screen bg-[url('/home-bg.webp')] relative bg-cover">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

        <HomeHero />
        
      </div>
    </>
  );
}

export default Home;