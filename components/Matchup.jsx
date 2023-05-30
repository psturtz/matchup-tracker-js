'use client'
import { useState, useEffect } from 'react';
import SelectPlayer from './SelectPlayer';
import Display from './DisplayStatistics';

const Matchup = () => {
  const [ firstPlayer, setFirstPlayer ] = useState({name: "Select a player", image: "/baseball-outline.svg", position: 'Default'});
  const [secondPlayer, setSecondPlayer] = useState({ name: "Select a player", image: "/baseball-outline.svg", position: 'Default' });
  const [ stats, setStats ] = useState({});
  
  useEffect(() => {
    if ((firstPlayer.position === 'P' && secondPlayer.position === 'P') || (firstPlayer.position !== 'P' && firstPlayer.position !== 'Default' && secondPlayer.position !== 'P' && secondPlayer.position !== 'Default')) {
      setSecondPlayer({ name: "Select a player", image: "/baseball-outline.svg", position: 'Default' })
    }
  }, [firstPlayer]);

  useEffect(() => {
    if ((firstPlayer.position === 'P' && secondPlayer.position === 'P') || (firstPlayer.position !== 'P' && firstPlayer.position !== 'Default' && secondPlayer.position !== 'P' && secondPlayer.position !== 'Default')) {
      setFirstPlayer({ name: "Select a player", image: "/baseball-outline.svg", position: 'Default' })
    }
  }, [secondPlayer])

  useEffect(() => {
  if (firstPlayer.position !== 'Default' && secondPlayer.position !== 'Default') {
    if (firstPlayer.position === 'P') {
      (async () => {
        const response = await fetch(`/api/stats/${secondPlayer.id}/${firstPlayer.id}`, {next: {cache: 'no-store'}})
        const data = await response.json();
        //console.log(data);
  
        setStats(data);
      })();
    } else {
      (async () => {
        const response = await fetch(`/api/stats/${firstPlayer.id}/${secondPlayer.id}`, { next: { cache: 'no-store' } })
        const data = await response.json();

        //console.log(data);
        setStats(data);
      })();
    }
  } else {
    setStats({});
  }
}, [firstPlayer, secondPlayer])


  return (
    <>
      <div className='w-full flex flex-col max-w-full items-center md:items-start md:flex-row md:justify-center pb-8 space-y-4 md:space-y-0'>
      <SelectPlayer player={firstPlayer} setPlayer={setFirstPlayer} otherPosition={secondPlayer}/>
      <Display stats={stats}/>
      <SelectPlayer player={secondPlayer} setPlayer={setSecondPlayer} otherPosition={firstPlayer} />
    </div>
    </>
  )
};

export default Matchup;
