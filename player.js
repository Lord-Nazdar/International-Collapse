/*----------------------------------------------------------------

			Player.js
			07/24/12
			
		Define the player element

----------------------------------------------------------------*/

var player =
{
	playerList: [],
	
	addPlayer: function (name, depPoint,color,textColor)
	{
		var id = this.playerList.length;
		this.playerList[id] = new playerElement; 
		this.playerList[id].depPoint = depPoint;
		this.playerList[id].name = name;
		this.playerList[id].color = color;
		this.playerList[id].textColor = textColor;
	}
}

function playerElement()
{
	var depPoint;
	var name;
	var color;
	var textColor
}
