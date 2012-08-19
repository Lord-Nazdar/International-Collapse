/*----------------------------------------------------------------

			UI.js
			07/24/12
			
	All function about UI

----------------------------------------------------------------*/

// Deploy menu

var deploy = false; //check if the deploy menu is deploy or not

function deployDeployMenu(){
	if(!deploy){
		var fromTop = 15;
		var margin = 2;
		var elementHeight = 12;
		var top = (fromTop+margin);
		
		document.getElementById("tankDeploy").style.top=top+"%";
		top += elementHeight+margin;
		document.getElementById("atDeploy").style.top=top+"%";
		top += elementHeight+margin;
		document.getElementById("infDeploy").style.top=top+"%";
		top += elementHeight+margin;
		document.getElementById("apcDeploy").style.top=top+"%";
		top += elementHeight+margin;
		document.getElementById("mlrsDeploy").style.top=top+"%";
		top += elementHeight+margin;
		document.getElementById("sniperDeploy").style.top=top+"%";
		
		deploy=true;
	}
	else{
		document.getElementById("tankDeploy").style.top="0";
		document.getElementById("atDeploy").style.top="0";
		document.getElementById("infDeploy").style.top="0";
		document.getElementById("apcDeploy").style.top="0";
		document.getElementById("mlrsDeploy").style.top="0";
		document.getElementById("sniperDeploy").style.top="0";
		
		deploy=false;
	}
}

// Chat Box

function unhideLog(){
	document.getElementById("log").style.opacity="1.0";
	logHidden=false;
	setTimeout(function() {document.getElementById("log").style.opacity="0.0";},4000);
}

// Side

function changeSide(id){
	rotateName("-90deg");
	setTimeout(function() {changeName(id)},1250);
}

function changeName(id){
	rotateName("0deg");
	document.getElementById("sideName").innerHTML=player.playerList[id].name;
	document.getElementById("sideName").style.backgroundColor=player.playerList[id].color;
	document.getElementById("sideName").style.color=player.playerList[id].textColor;
	document.getElementById("sideImg").src="images/"+player.playerList[id].name+".png";
}

function rotateName(angle){
	$("#sideName").css("-webkit-transform","rotate("+angle+")");
}

// Unit Menu

function unitMenu(id){
	var valueMove = document.getElementById("moveValue");
	var valueRotate = document.getElementById("rotateValue");
	var valueAttack =document.getElementById("attackValue");
	var valueSpecial = document.getElementById("specialValue");
	
	valueMove.innerHTML = UnitController.units[id].model.MP;
	valueRotate.innerHTML = UnitController.units[id].model.MP;
	valueAttack.innerHTML = UnitController.units[id].model.AP;
	valueSpecial.innerHTML = "X";

	var name = document.getElementById("infoNameUnitMenu");
	//var speed = document.getElementById("unitSpeed");
		
	name.innerHTML=UnitController.units[id].model.type;
	//speed.innerHTML=unitInfo[UnitController.units[id].model.type].speed;;
}