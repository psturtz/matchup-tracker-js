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
          <div className="flex items-start justify-between w-full flex-col md:flex-row">
            <div className="flex justify-start items-center flex-col text-center md:max-w-[45%]">
              <p className="head_text orange_gradient pt-2 pb-4 text-center max-w-lg">
                Responsive View for Mobile and Desktop
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center flex-wrap">
                <Image
                  src="/examples/example-home-5-26-23.png"
                  alt="DesktopDemo"
                  className="rounded-xl py-2 lg:px-8 hidden md:flex"
                  height={800}
                  width={800}
                />
                <Image
                  src="/examples/example-mobile-5-30-23.png"
                  alt="Mobile Demo"
                  className="rounded-xl py-2 lg:px-8 md:hidden"
                  height={200}
                  width={200}
                />
              </div>
            </div>
            <div className="flex justify-start items-center flex-col text-center md:max-w-[45%]">
              <p className="head_text purple_gradient pt-2 pb-4 text-center max-w-lg">
                Choose the Stats YOU Care About!
              </p>
              <Image
                src="/examples/example-settings-5-26-23.png"
                alt="Settings Demo"
                className="rounded-xl py-2 lg:px-8 md:w-80"
                height={800}
                width={800}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;