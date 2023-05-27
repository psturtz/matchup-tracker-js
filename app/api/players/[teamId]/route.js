import teams from "@utils/api-conversion"

export const GET = async (request, { params }) => {
  const { teamId } = params;

  try {
    const players = {
      pitchers: [],
      positionPlayers: [],
    }
    const response = await fetch(`https://statsapi.mlb.com/api/v1/teams/${teamId}/roster`);
    const data = await response.json();
    data.roster.forEach(el => {
      const player = {
        id: el.person.id,
        name: el.person.fullName,
        position: el.position.abbreviation,
        genPosition: el.position.type,
        number: el.jerseyNumber,
        parentTeamId: el.parentTeamId
      }
      if (player.position === 'P') players.pitchers.push(player)
      else players.positionPlayers.push(player)
    });
    const espnResponse = await fetch(
      `http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/${teams[teamId].espnId}/roster`
    );
    const espnData = await espnResponse.json();
    for (const section in players) {
      players[section].forEach(localEl => {
        espnData.athletes.forEach(espnSection => {
          if (espnSection.position.slice(0, -1) === localEl.genPosition) {
            espnSection.items.forEach(espnEl => {
              if (espnEl.jersey === localEl.number) {
                localEl.image = espnEl.headshot
                  ? espnEl.headshot.href
                  : '';
                localEl.bats = espnEl.bats.displayValue,
                localEl.throws = espnEl.throws.displayValue
                localEl.firstName = espnEl.firstName
                localEl.lastName = espnEl.lastName
              }
            })
          }
        })
      })
    }
    return new Response(JSON.stringify(players), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to gather team data', { status: 500})
  }
}