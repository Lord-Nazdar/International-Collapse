/*----------------------------------------------------------------

			EventHandler.js
			07/24/12
			
		Where all the events are treated

----------------------------------------------------------------*/


var lastI;
var lastJ;
var clickedUnit;
var orientate=false;

var action;

var EventHandler =
{
    selectedUnitID: false,
    
    clickTile: function (i, j)
    {
        if(UnitController.getUnitAt(uv(i, j)))
		{
			
			if(UnitController.getUnitAt(uv(i, j)).model.side==activTurn)
			{
				clickedUnit = UnitController.getUnitAt(uv(i, j));
				this.selectedUnitID = clickedUnit.id;
				unitMenu(this.selectedUnitID);
			}
		}
        else if(this.selectedUnitID !== false)
		{
			if(action=="rotate"){
				orientateUnit(clickedUnit,uv(i,j));
				action="";
			}
			else if(action=="move"){
				MapController.resetHighlight();
				possibleMove=initTab(mapWidth,mapHeight);
				detectMove(unitInfo[UnitController.units[this.selectedUnitID].model.type].speed,UnitController.units[this.selectedUnitID].model.position);
				//possibleMove[j][i]=1;
				highlightAround();
			}
			if(possibleMove[j][i]==1){
				logDiv.moveUnitLog(this.selectedUnitID,UnitController.units[this.selectedUnitID].model.position,uv(i,j));
				for(var inc=closedList.length;inc!=0;inc--){
					UnitController.moveUnit(this.selectedUnitID, uv(closedList[inc-1].act.u, closedList[inc-1].act.v));
				}
				UnitController.moveUnit(this.selectedUnitID, uv(i,j));
				
				orientate=true;
			}	
			resetTab(possibleMove,mapWidth,mapHeight);
			MapController.resetHighlight();
			this.selectedUnitID= false;
		}
    },
    
    mouseoverTile: function (i, j)
    {
		if(this.selectedUnitID !== false){
			highlightAround(unitInfo[UnitController.units[this.selectedUnitID].model.type].speed, i, j);
			if(possibleMove[j][i]==1){
				highlight(i,j,"red", true);
				Astar(uv(i,j),UnitController.units[this.selectedUnitID],1);
			}
		}
    }
    
    //mouseoutTile,
    
    //mousemoveTile,
    
    //mousedownTile,
    
    //mouseupTile
    
    //dblclickTile,
    
    //dragstartTile,
    
    //dragendTile,
}

// TO-DO : Cleaner les fonctions et les passer en convention bundle

function initTab(w,h){
	var tab = new Array;
	for(i=0;i<w;i++){
		tab[i]=new Array;
		for(j=0;j<h;j++){
			tab[i][j]=0;
		}
	}
	return tab;
}

function resetTab(tab,w,h){
	for(i=0;i<w;i++){
		for(j=0;j<h;j++){
			tab[i][j]=0;
		}
	}
	return tab;
}

function detectMove(radius,pos){
	var i=pos.u;
	var j=pos.v;
	
	if(checkDim(i,j+1)){if(allowedTerrain(clickedUnit,map[j+1][i])&&presenceUnit(uv(i,j+1))){possibleMove[j+1][i]=1;if(radius>=2){detectMove(radius-1,i,j+1);}}}
	if(checkDim(i,j-1)){if(allowedTerrain(clickedUnit,map[j-1][i])&&presenceUnit(uv(i,j-1))){possibleMove[j-1][i]=1;if(radius>=2){detectMove(radius-1,i,j-1);}}}
	if(checkDim(i+1,j)){if(allowedTerrain(clickedUnit,map[j][i+1])&&presenceUnit(uv(i+1,j))){possibleMove[j][i+1]=1;if(radius>=2){detectMove(radius-1,i+1,j);}}}
	if(checkDim(i-1,j)){if(allowedTerrain(clickedUnit,map[j][i-1])&&presenceUnit(uv(i-1,j))){possibleMove[j][i-1]=1;if(radius>=2){detectMove(radius-1,i-1,j);}}}
	
	if(i%2){
		if(checkDim(i+1,j+1)){if(allowedTerrain(clickedUnit,map[j+1][i+1])&&presenceUnit(uv(i+1,j+1))){possibleMove[j+1][i+1]=1;if(radius>=2){detectMove(radius-1,i+1,j+1);}}}
		if(checkDim(i-1,j+1)){if(allowedTerrain(clickedUnit,map[j+1][i-1])&&presenceUnit(uv(i-1,j+1))){possibleMove[j+1][i-1]=1;if(radius>=2){detectMove(radius-1,i-1,j+1);}}}
	}
	
	else{
		if(checkDim(i+1,j-1)){if(allowedTerrain(clickedUnit,map[j-1][i+1])&&presenceUnit(uv(i+1,j-1))){possibleMove[j-1][i+1]=1;if(radius>=2){detectMove(radius-1,i+1,j-1);}}}
		if(checkDim(i-1,j-1)){if(allowedTerrain(clickedUnit,map[j-1][i-1])&&presenceUnit(uv(i-1,j-1))){possibleMove[j-1][i-1]=1;if(radius>=2){detectMove(radius-1,i-1,j-1);}}}
	}
}

function presenceUnit(pos){
	if(UnitController.getUnitAt(pos)!=false){
		if(UnitController.units[UnitController.getUnitAt(pos).id].model.side==UnitController.units[EventHandler.selectedUnitID].model.side){
			return true;
		}
		return false;
	}
	return true;
}

function allowedTerrain(unit, terrain){
	for(var i=0;i<unitInfo[unit.model.type].move.length;i++){
		if(unitInfo[unit.model.type].move[i]==terrain)
			return true;
	}
	return false;
}

function orientateUnit(unit,pos){
	//On détermine l'angle
	//A = acos(AB.AC/(||AB||*||AC||))
	//AB.AC = ABx*ACx + ABy*ACy + ABz*ACz
	var Ax = hexCoordToScreenCoord(pos);
	var A = uv(Ax.x,Ax.y);
	var Bx = hexCoordToScreenCoord(uv(pos.u,pos.v-1));
	var B = uv(Bx.x,Bx.y);
	var Cx = hexCoordToScreenCoord(UnitController.units[unit.id].model.position);
	var C = uv(Cx.x,Cx.y);
	var angleA = vector.angleABC(A,B,C);
	
	var computeA = Math.floor(((180*angleA)/Math.PI)/60);
	
	if(computeA==3)computeA=0;
	else if(computeA==0)computeA=3;
	else if(A.u>C.u){
		if(computeA==1)computeA=1;
		else if(computeA==-2)computeA=2;
	}
	else
	{
		if(computeA==1)computeA=5;
		else if(computeA==-2)computeA=4;
	}
	
	//alert(computeA);
	
	UnitController.rotateUnit(unit.id,computeA);
	
	logDiv.rotateUnitLog(unit.id,computeA);
	
	//alert((180*angle)/Math.PI);
	//alert(Math.floor(((180*angle)/Math.PI)/60));
}

function vect(A,B){
	return uv(B.u-A.u,B.v-A.v);
}

function highlightAround(){
	for(i=0;i<mapWidth;i++){
		for(j=0;j<mapHeight;j++){
			if(possibleMove[j][i]==1){highlight(i,j,"blue");}
		}
	}
	
	highlightLayer.draw();
}

function highlight(i,j,color, draw){
	MapController.highlightTileAt(i, j,
	{
		fill: color,
		alpha: .25,
		nodraw:!draw
	});
}

function checkDim(i,j){
	if(i>=0&&j>=0&&i<mapWidth&&j<mapHeight){return true;}
	else {return false;}
}
