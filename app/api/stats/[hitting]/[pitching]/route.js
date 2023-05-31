export const GET = async (req, {params}) => {
  const { hitting, pitching } = params;
  const response = await fetch(
    `https://statsapi.mlb.com/api/v1/people/${hitting}?hydrate=stats(group=[hitting],type=[vsPlayer],opposingPlayerId=${pitching},season=[2023],sportId=1)`,
    { next: { revalidate: 300 } }
  );
  const data = await response.json();
  const stats = data.people[0].stats.find((el) => el.type.displayName == 'vsPlayerTotal').splits[0]?.stat ? data.people[0].stats.find((el) => el.type.displayName == 'vsPlayerTotal').splits[0]?.stat : {
      gamesPlayed: 0,
      groundOuts: 0,
      airOuts: 0,
      doubles: 0,
      triples: 0,
      homeRuns: 0,
      strikeOuts: 0,
      baseOnBalls: 0,
      intentionalWalks: 0,
      hits: 0,
      hitByPitch: 0,
      avg: 0,
      atBats: 0,
      obp: 0,
      slg: 0,
      ops: 0,
      groundIntoDoublePlay: 0,
      groundIntoTriplePlay: 0,
      numberOfPitches: 0,
      plateAppearances: 0,
      totalBases: 0,
      rbi: 0,
      leftOnBase: 0,
      sacBunts: 0,
      sacFlies: 0,
      babip: 0,
      groundOutsToAirouts: 0,
      catchersInterference: 0,
      atBatsPerHomeRun: 0,
    };
  return new Response(JSON.stringify(stats), { status: 200 });
}