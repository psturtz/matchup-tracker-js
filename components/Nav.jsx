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
      <Link href="/" className="flex gap-2 flex-center">
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
            <div className="flex flex-col items-center text-center pt-8">
            <p className="head_text green_gradient pb-4">Sign In With</p>
              {providers && Object.values(providers).map((provider) => (
                <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
                  className="black_btn">
                  <Image 
                    src='google.svg'
                    alt='Google'
                    height={40}
                    width={100}
                  />
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
            <div className="flex flex-col items-center text-center pt-8">
            <p className="head_text green_gradient pb-4">Sign In With</p>
            {providers && Object.values(providers).map((provider) => (
              <button type="button" key={provider.name} onClick={() => signIn(provider.id)}
                className="black_btn">
                <Image
                  src='google.svg'
                  alt='Google'
                  height={40}
                  width={100}
                />
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
