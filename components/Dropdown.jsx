'use client'

import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import teams from '@utils/api-conversion'

// alphabetize teams
function compare(a, b) {
  if (teams[a].location < teams[b].location) {
    return -1;
  }
  if (teams[a].location > teams[b].location) {
    return 1;
  }
  return 0;
}

export default function Dropdown({type, selected, setSelected, data, other}) {
  const [ roster, setRoster ] = useState(null);

  useEffect(() => {
    if (data?.mlbId) {
      (async () =>{
        const response = await fetch(`/api/players/${data.mlbId}`);
        const newData = await response.json();
        const allPlayers = newData.positionPlayers.concat(newData.pitchers)
        setRoster(allPlayers)
      })()
    }
  },[data])

  return (
      <div className={`w-full ${!roster && type === 'player' && 'hidden'}`}>
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
          <Listbox.Button className={`relative w-full cursor-default flex items-baseline justify-left rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-teal sm:text-sm`}>
            <span className="w-full truncate">
              <Image
                src={selected.image}
                alt=""
                width={75}
                height={75}
                className='mr-2 inline-block flex-2 w-2/12'
              />{selected.name}{type === 'player' && selected.position !== 'Default' && <> ({selected.position}) #{selected.number}</>}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 z-10 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {type === 'team' ? Object.keys(teams).sort(compare).map((mlbId) => {
                return (
                  <Listbox.Option key={teams[mlbId].name} className={({ active }) =>
                    `relative cursor-default select-none py-2 md:max-lg:pl-4 pl-6 pr-4 flex items-center z-20 justify-between ${active ? 'bg-primary-teal text-primary-white' : 'text-gray-900'
                    }`
                  }
                    value={teams[mlbId]}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`flex items-center justify-start truncate md:text-xs max-w-5/6 ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                        <Image
                          src={teams[mlbId].image}
                          alt={`${teams[mlbId].name} image`}
                          width={37}
                          height={37}
                          className='mr-2 w-1/6'
                        /> {teams[mlbId].location} {teams[mlbId].name}
                        </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-primary-black">
                              <CheckIcon className="h-1/12 w-1/12 lg:2/12" aria-hidden="true" />
                            </span>
                          ) : null}
                          </>
                    )}
                  </Listbox.Option>
                )
              }) : roster ? roster.map((player) => {
                return (
                  <>
                    {(other.position === 'P' && player.position === 'P' && selected.position === 'Default') ? <> </>
                    : player.position !== 'P' && (other.position !== 'P' && other.position !== 'Default') && selected.position === 'Default' ? <></> : (
                      <Listbox.Option key={player.name} className={({ active }) =>
                        `relative cursor-default select-none py-2 md:max-lg:pl-4 pl-6 pr-4 flex items-center -z-20 justify-between ${active ? 'bg-primary-teal text-primary-white' : 'text-gray-900'
                        }`
                      }
                        value={player}
                      >
                        {({ selected }) => (
                          <>
                            <span
                                className={`flex items-center justify-start truncate md:text-xs ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              <Image
                                src={player.image}
                                alt="N/A"
                                width={400}
                                height={400}
                                quality={100}
                                className='mr-2 w-1/6'
                              /> {player.name} ({player.position}) #{player.number}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-black">
                                  <CheckIcon className="h-1/12 w-1/12 lg:2/12" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    )}
                  </>
                )
              }) : (<></>)}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
  )
}
