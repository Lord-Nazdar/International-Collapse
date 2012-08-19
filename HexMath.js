/*----------------------------------------------------------------

			HexMath.js
			07/24/12
			
	Some Math for transforming the hex Coord

----------------------------------------------------------------*/


var hexRadius = 37;
var hexHeight = 64;

function hexCoordToScreenCoord(position)
{
    return {
        x: position.u * hexRadius * 1.5,
        y: (position.v + position.u%2/2) * hexHeight
    };
}

function hexCoordToScreenCoordCenter(position)
{
	var hCoord = hexCoordToScreenCoord(position);
	return {
		x: hCoord.x+moveL + hexRadius,
		y: hCoord.y+moveR + hexHeight / 2
	};
}
