/*----------------------------------------------------------------

			Astar.js
			07/24/12
			
		Algorithm for the Pathfinding

----------------------------------------------------------------*/


var openList  = new Array();
var closedList  = new Array();

function Astar(pos,unit,from){	//From permet de savoir si il faut clear les tab 1=reset
	
	if(from==1){
		openList.length=0;
		closedList.length=0;
	}
	
	if(from==2){
		openList.length=0;
	}
	
	//On inscrit dans la liste ouverte
	if(possibleMove[pos.v+1][pos.u]==1){openList[openList.length]={"parent":uv(pos.u,pos.v),"G":distance(uv(pos.u,pos.v+1),unit.model.position),"act":uv(pos.u,pos.v+1)};}
	if(possibleMove[pos.v-1][pos.u]==1){openList[openList.length]={"parent":uv(pos.u,pos.v),"G":distance(uv(pos.u,pos.v-1),unit.model.position),"act":uv(pos.u,pos.v-1)};}
	if(possibleMove[pos.v][pos.u+1]==1){openList[openList.length]={"parent":uv(pos.u,pos.v),"G":distance(uv(pos.u+1,pos.v),unit.model.position),"act":uv(pos.u+1,pos.v)};}
	if(possibleMove[pos.v][pos.u-1]==1){openList[openList.length]={"parent":uv(pos.u,pos.v),"G":distance(uv(pos.u-1,pos.v),unit.model.position),"act":uv(pos.u-1,pos.v)};}
	
	if(pos.u%2){
		if(possibleMove[pos.v+1][pos.u+1]==1){openList[openList.length]={"parent":uv(pos.u,pos.v),"G":distance(uv(pos.u+1,pos.v+1),unit.model.position),"act":uv(pos.u+1,pos.v+1)};}
		if(possibleMove[pos.v+1][pos.u-1]==1){openList[openList.length]={"parent":uv(pos.u,pos.v),"G":distance(uv(pos.u-1,pos.v+1),unit.model.position),"act":uv(pos.u-1,pos.v+1)};}
	}
	else{
		if(possibleMove[pos.v-1][pos.u+1]==1){openList[openList.length]={"parent":uv(pos.u,pos.v),"G":distance(uv(pos.u+1,pos.v-1),unit.model.position),"act":uv(pos.u+1,pos.v-1)};}
		if(possibleMove[pos.v-1][pos.u-1]==1){openList[openList.length]={"parent":uv(pos.u,pos.v),"G":distance(uv(pos.u-1,pos.v-1),unit.model.position),"act":uv(pos.u-1,pos.v-1)};}
	}

	//alert("unit ="+unit.model.type+ " speed="+unitInfo[unit.model.type].speed);
	
	if(unitInfo[unit.model.type].speed!=1){
		var id = lowerOpenList();
		//alert(id);
		closedList[closedList.length]=openList[id];
	}
	
	if((openList[id].act.u==unit.model.position.u && openList[id].act.v==unit.model.position.v)||unitInfo[unit.model.type].speed==1){
		
		var pointList=new Array();
		
		//alert("if vrai");
		
		//Over une fois la liste etablie, evite les flash
		for(var i=0;i<closedList.length;i++){
			highlight(closedList[i].act.u,closedList[i].act.v,"red", true);
			var coord = hexCoordToScreenCoord(closedList[i].act);
			pointList[pointList.length]=coord.x;
			pointList[pointList.length]=coord.y;
		}
		
		
		//On va tenter de tracer une ligne pour plus de clarte
		//ARG !! cela ne semble pas marcherpour l'instant
		var redLine = new Kinetic.Line({
          points: pointList,
          stroke: "red",
          strokeWidth: 15,
          lineCap: "round",
          lineJoin: "round"
        });
		
		highlightLayer.add(redLine);
		highlightLayer.draw();
		
		return;
	}
	else{
		Astar(uv(openList[id].act.u,openList[id].act.v),unit,2); //normalement on clear pas l'open a chaque fois
	}
}

function distance(A,B){
	return Math.sqrt(((B.u-A.u)*(B.u-A.u))+((B.v-A.v)*(B.v-A.v)));
}

function lowerOpenList(){
	var lower=openList[0].G;
	var id = 0;
	for(var i=0;i<openList.length;i++){
		if(openList[i].G<lower){
			lower=openList[i].G;
			id=i;
		}
	}
	return id;
}
