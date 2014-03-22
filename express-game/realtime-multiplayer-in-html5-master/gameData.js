var playerData = undefined;
var otherPlayers = new Array();
getPlayers = function(host, otherPlayer)
{
	if(playerData == undefined)
	{
		addPlayer(otherPlayers, otherPlayer);
		playerData = { self: host, other: otherPlayers};
	}
	return playerData;
}
addPlayer = function(players ,otherPlayer)
{
	players.push(otherPlayer);

}
