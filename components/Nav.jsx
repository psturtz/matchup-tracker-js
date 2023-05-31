"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { usePathname } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();
  const path = usePathname();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response)
    })()
  }, [])

  return (
    <nav className={`${session?.user ? 'flex-between lg:mb-16': ''} w-full mb-8 pt-3`}>
      <Link href="/" className={`${session?.user ? 'flex flex-center' : 'hidden'} gap-2`}>
        <Image
          src="undraw_home_run.svg"
          alt="Logo"
          width={50}
          height={50}
          style={{color: 'teal'}}
          className="object-contain"
        />
      </Link>

      <div className={`sm:flex hidden relative ${session?.user ? '' : 'justify-center'}`}>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {path !== '/settings' ? 
            <Link href="/settings" className="black_btn">
              Settings
            </Link> : (
            <Link href="/" className="black_btn">
              Home
            </Link>
            )}
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/">
              <Image
                src={session?.user?.image}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            
            <div className="flex flex-col items-center text-center pt-4">
              <h1 className="head_text text-center blue_gradient py-4">
                Baseball <br className="max-md:hidden" />
                <span className="text-center ">Statistics</span>
              </h1>
              <p className=" text-base text-center font-medium text-primary-teal mt-4 px-8 py-4 sm:py-2 max-w-lg">
                Check lifetime matchup statistics between every player on a Major
                League roster!
              </p>
                {providers && Object.values(providers).map((provider) => (
                  <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
                    className="rounded-lg border shadow-md border-primary-white bg-primary-white mt-8 py-3 px-5 w-8/12 text-primary-black transition-all hover:bg-primary-white hover:text-primary-black text-center text-sm flex items-center justify-center">
                    <Image
                      src='google.svg'
                      alt='Google'
                      height={40}
                      width={40}
                    />
                    <p className="px-2">Sign Up / Sign In With Google</p>
                  </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={`sm:hidden flex relative ${session?.user ? '' : 'justify-center'}`}>
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                {path !== '/settings' ? 
                <Link
                  href="/settings"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Settings
                </Link> : (
                <Link
                    href="/"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Home
                </Link>
                )}
                <button type="button" onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            
            <div className="flex flex-col items-center text-center pt-4">
              <h1 className="head_text text-center blue_gradient py-4">
                Baseball <br className="max-md:hidden" />
                <span className="text-center ">Statistics</span>
              </h1>
              <p className=" text-base text-center font-medium text-primary-teal px-8 py-4 sm:py-2 max-w-lg">
                Check lifetime matchup statistics between every player on a Major
                League roster!
              </p>
              {providers && Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
                  className="rounded-lg w-100 border shadow-md border-primary-white bg-primary-white py-1.5 px-5 mt-8 text-primary-black transition-all hover:bg-primary-white hover:text-primary-black text-center text-sm flex items-center justify-center">
                  <Image
                    src='google.svg'
                    alt='Google'
                    height={40}
                    width={40}
                  />
                  <p className="px-2">Sign Up / Sign In With Google</p>
                </button>
            ))}
            </div>
          </>
        )}
      </div>
    </nav>
  )
};

export default Nav;
