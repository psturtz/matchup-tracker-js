'use client'

import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

import category from '@utils/alias';


const Settings = ({}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [ settings, setSettings ] = useState(null);
  useEffect(() => {
    if (!settings) {
      if (session?.user) {
        setSettings(session.user.settings)
      }
    }
  },[session, settings])

  const handleClick = async () => {
    try {
      await fetch(`/api/user/${session?.user.id}/settings`, {
        method: 'PUT',
        body: JSON.stringify(settings)
      })
      console.log('Successfully updated settings');
      location.assign('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full text-center flex flex-col justify-start items-center pb-12">
      <span className=" text-5xl pb-2 blue_gradient font-semibold">Settings</span>
      <p className="mt-4 text-base">Select the statistics you want to see!</p>
      <section className="w-full md:w-4/5 lg:w-3/5 flex flex-col space-y-2 items-baseline mt-8">
        {settings &&
          Object.keys(settings.stats).map((el) => {
            if (el === '_id') return;
            return (
              <div
                key={el}
                className="w-full flex flex-row items-center justify-between py-2"
              >
                <span className="text-sm text-primary-white shadow-sm">
                  {category[el]}
                </span>
                <Switch
                  key={el}
                  checked={settings.stats[el]}
                  onChange={() =>
                    setSettings((prev) => ({
                      stats: {
                        ...prev.stats,
                        [el]: !prev.stats[el],
                      },
                    }))
                  }
                  className={`${
                    settings.stats[el] ? 'bg-teal-700' : 'bg-teal-900'
                  }
            relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      settings.stats[el] ? 'translate-x-9' : 'translate-x-0'
                    }
              pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            );
          })}
        <button
          type="button"
          onClick={handleClick}
          className="teal_btn ml-auto mr-auto md:mr-0"
        >Save Changes</button>
      </section>
    </div>
  );
};

export default Settings;
