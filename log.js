/*----------------------------------------------------------------

			log.js
			07/24/12
			
	Log console

----------------------------------------------------------------*/

var logDiv =
{
	writeInLog:function(text)
	{
	var log=document.getElementById("log");
	var oldText=log.innerHTML;
	log.innerHTML=oldText + "</br>" + text;
	log.scrollTop = log.scrollHeight;
	unhideLog();
	},

	moveUnitLog:function(id,from,to)
	{
	var log=document.getElementById("log");
	var oldText=log.innerHTML;
	log.innerHTML=oldText + "</br>" + "Moving Unit " + id + " from (" + from.u + ";" + from.v +") to (" + to.u + ";" + to.v + ")";
	log.scrollTop = log.scrollHeight;
	unhideLog();
	},
	
	rotateUnitLog:function(id,angle)
	{
	var log=document.getElementById("log");
	var oldText=log.innerHTML;
	log.innerHTML=oldText + "</br>" + "Rotating Unit " + id + " angle " + angle ;
	log.scrollTop = log.scrollHeight;
	unhideLog();
	},
	
	buyUnitLog:function(id,unit,cost)
	{
	var log=document.getElementById("log");
	var oldText=log.innerHTML;
	log.innerHTML=oldText + "</br>" + "Player " + id + " buy a " + unit + " for " + cost;
	log.scrollTop = log.scrollHeight;
	unhideLog();
	}
}