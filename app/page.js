'use client'
import { useSession } from 'next-auth/react';
import Matchup from '@components/Matchup';
import Image from 'next/image';

const Home = () => {
  const { data: session} = useSession();

  return (
    <section className="w-full max-w-full flex items-center flex-col pb-12">
      {session?.user ? (
        <Matchup />
      ) : (
        <>
          <h1 className="head_text text-center blue_gradient py-4">
            Baseball <br className="max-md:hidden" />
            <span className="text-center ">Statistics</span>
          </h1>
          <p className="text-md text-center text-primary-black bg-primary-white rounded-full shadow-md mt-4 px-8 py-4 sm:py-2 max-w-lg">
            Check lifetime matchup statistics between every player on a Major
            League roster!
          </p>
          <p className="head_text orange_gradient pt-12 pb-4 text-center max-w-lg">
            Responsive View for Mobile and Desktop
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center flex-wrap">
            <Image
              src="/examples/example-home-5-26-23.png"
              alt="DesktopDemo"
              className="rounded-xl py-2 lg:px-8"
              height={800}
              width={800}
            />
            <Image
              src="/examples/example-mobile-5-26-23.png"
              alt="Mobile Demo"
              className="rounded-xl py-2 lg:px-8"
              height={200}
              width={200}
            />
          </div>
          <p className="head_text purple_gradient pt-12 pb-4 text-center max-w-lg">
            Choose the Stats YOU Care About!
          </p>
          <Image
            src="/examples/example-settings-5-26-23.png"
            alt="Settings Demo"
            className="rounded-xl py-2 lg:px-8 md:w-80"
            height={800}
            width={800}
          />
        </>
      )}
    </section>
  );
};

export default Home;