/*----------------------------------------------------------------

			MapController.js
			07/24/12
			
		All the functions about the map

----------------------------------------------------------------*/


// TO-DO : Utiliser hexCoordToScreenCoordCenter à la place histoire de pouvoir jarter hCTSC
// Passer en convention bundle

//Sert au deplacement de la map
var moveL=0;
var moveR=0;

var MapController =
{
    tiles: [],

    setup: function ()
    {
        for(var i = 0; i < map.length; i++)
        {
            this.tiles[i] = [];
            for(var j = 0; j < map[i].length; j++)
            {
                this.tiles[i][j] = (function (i, j) // Closure pour éviter de choper i et j par référence
                {
                    hCoord = hexCoordToScreenCoord(uv(j, i));

                    terrainLayer.add(new Kinetic.Image(
                    {
                        image: Resources.Images[ ( ["water", "grass", "mountain","sand","forest"] )[ map[i][j] ] ],
                        x: hCoord.x+moveL,
                        y: hCoord.y+moveR,
                        width: 2 * hexRadius,
                        height: hexHeight
                    }));

                    var tile = new Kinetic.RegularPolygon(
                    {
                        sides: 6,
                        radius: hexRadius,
                        x: hCoord.x+moveL,
                        y: hCoord.y+moveR,
                        stroke: "black",
                        centerOffset:
                        {
                            x: -hexHeight / 2,
                            y: hexRadius
                        },
                        rotationDeg: 90
                    });

                    tile.on("click", function (){ EventHandler.clickTile(j, i); });
                    tile.on("mouseover", function (){ EventHandler.mouseoverTile(j, i); });
					tile.on("tap", function(){ EventHandler.clickTile(j, i)});
					tile.on("touchstart", function(){ EventHandler.clickTile(j, i)});

                    highlightLayer.add(tile);

                    return tile;

                })(i, j);
            }
        }
    },


    getTileAt: function (i, j)
    {
        return tiles[i][j];
    },

    resetHighlight: function ()
    {
        for(var i = 0; i < this.tiles.length; i++)
            for(var j = 0; j < this.tiles[i].length; j++)
                this.highlightTileAt(j, i,
                {
                    fill: "transparent",
                    stroke: "black",
                    thickness: "2",
                    alpha: "1",
                    nodraw: true
                })
                
        highlightLayer.draw();
    },

    highlightTileAt: function (i, j, style)
    {
        if(style)
        {
            if(style.fill != undefined) this.tiles[j][i].setFill(style.fill);
            if(style.stroke != undefined) this.tiles[j][i].setStroke(style.stroke);
            if(style.thickness != undefined) this.tiles[j][i].setStrokeWidth(style.thickness);
            if(style.alpha != undefined) this.tiles[j][i].setAlpha(style.alpha);
            if(!style.nodraw) highlightLayer.draw();
        }
    }
}
