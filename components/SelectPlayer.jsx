`use client`
import Dropdown from "./Dropdown";
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

const SelectPlayer = ({player, setPlayer, otherPosition}) => {
  const [ team, setTeam ] = useState({name: "Select a team...", image: 'baseball-outline.svg'});
  useEffect(() => {
    setPlayer({ name: "Select a player", image: "/baseball-outline.svg", position: 'Default' });
  }, [team, setPlayer])

  return (
    <div className="flex flex-col w-full md:w-2/6 justify-start items-center space-y-6 py-6 md:py-0 px-6 border rounded border-primary-black bg-primary-black shadow-md">
      <p className=" font-bold text-primary-teal text-xl pt-4"> Select Player </p>
      <Dropdown type="team" selected={team} setSelected={setTeam}/>
      <Dropdown type="player" selected={player} setSelected={setPlayer} data={team} other={otherPosition}/>
      {player.position !== 'Default' && <Image 
        src={player.image}
        alt=""
        height={100}
        width={100}
        className="w-4/5"
      />}
      <div className="text-primary-teal text-center font-semibold pb-4">
        {(player.position !== 'Default' && player.position === 'P')
        ? (
          <>
            Throws {player.throws} <br/>
              <a className="underline pt-2 hover:text-primary-white" href={`https://www.baseball-reference.com/search/search.fcgi?hint=&search=${player.firstName}+${player.lastName}&pid=&idx=`} target="_blank">
                {player.name} Career Statistics
              </a>
        </>)
        : player.position !== 'Default' && player.position !== 'P' &&
        (
          <> 
              Bats {player.bats} <br />
              <a className="underline pt-2 hover:text-primary-white" href={`https://www.baseball-reference.com/search/search.fcgi?hint=&search=${player.firstName}+${player.lastName}&pid=&idx=`} target="_blank">
                {player.name} Career Statistics
              </a>
          </>
        )}

      </div>
    </div>
  )
};

export default SelectPlayer;
