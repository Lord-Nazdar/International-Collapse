/*----------------------------------------------------------------

			main.js
			07/24/12
			
		Where all started

----------------------------------------------------------------*/

//Version Number
var version = "0.2.7";


//Fonction permettant de charger un fichier js ** A deplacer evidement
function include(fileName){
	document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
}

include("./map/debarquement.js");
include("./map/mission1.js");

var mapHeight=10;
var mapWidth=12;

var possibleMove = new Array();       
            

var terrainLayer = new Kinetic.Layer(); // Rendered only once, contains tiles images
var highlightLayer = new Kinetic.Layer(); // Contains hex shapes, used for mouse events, and special coloring of tiles
var unitLayer = new Kinetic.Layer(); // Contains unit sprites
var effectLayer = new Kinetic.Layer(); // Contains particles, bullets, missiles, etc.
var uiLayer = new Kinetic.Layer(); // Contains UI elements

var stage;

var activTurn=0;

function main()
{
	logDiv.writeInLog("-- Initialize the game --");
	logDiv.writeInLog("* Version  : "+version);

    stage = new Kinetic.Stage({
      container: "container",
     /* width: document.body.offsetWidth,
      height: document.body.offsetHeight,*/
	  width: 800,
      height: 600
    });

    //Resources.Images.list = ["apc", "at", "inf", "mlrs", "sniper", "tank", "grass", "mountain", "water"];
    //Resources.Images.load();
    

    MapController.setup();
    
    player.addPlayer("NATO",10, "#003059","white");
    player.addPlayer("CCCP",10, "#c91717","#ffec17");

    
    UnitController.addUnit(new UnitModel("apc", uv(9, 4), 4, 0));
    UnitController.addUnit(new UnitModel("at", uv(9, 5), 0, 0));
    UnitController.addUnit(new UnitModel("sniper", uv(3, 6), 1, 1));
    
    unitLayer.listen(false);
    
    stage.add(terrainLayer);
    stage.add(highlightLayer);
    stage.add(unitLayer);
	
	logDiv.writeInLog("* Units and Graphics Loaded");
	logDiv.writeInLog("-- Running the game --");
	
	logDiv.writeInLog("// It's player " + activTurn + " turn //");
    
    /*
    stage.onFrame(function()
    {
        TWEEN.update
    });
    
    stage.start();
    */
    
    setInterval(TWEEN.update, 5);
}

function switchTurn() {
	activTurn++;
	activTurn = activTurn%2;
	
	logDiv.writeInLog("// It's player " + activTurn + " turn //");
	changeSide(activTurn);
}

//document.documentElement.onload = main;

    Resources.Images.list = ["apc", "apc_hull", "apc_turret", "at", "inf", "mlrs", "sniper", "tank", "tank_hull", "tank_turret", "grass", "mountain", "water", "sand","forest"];
    Resources.Images.load();
    
    
//Add Unit menu
function buyUnit(unit) {
	if(checkdepPoint(player.playerList[activTurn].depPoint,unitInfo[unit].deploy)/*&& checkdeployServ(player.playerList[activTurn].depPoint,unitInfo[unit].deploy)*/)
	{
		deployDeployMenu();
	
		UnitController.addUnit(new UnitModel(unit, uv(9, 6), 1, activTurn));
		player.playerList[activTurn].depPoint-=unitInfo[unit].deploy;
		stage.add(unitLayer);
		logDiv.buyUnitLog(activTurn,unit,unitInfo[unit].deploy);
	}
	else
		alert("not enough deploy point");
}

function checkdepPoint(playerPoint,cost){
	if(playerPoint>=cost)
		return true;
	else
		return false;
}