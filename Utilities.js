/*----------------------------------------------------------------

			Utilities.js
			07/24/12
			
		Some usefull functions

----------------------------------------------------------------*/


var Utilities = 
{
	positionTween: function(object, targetValue)
    {
        var tweenObject = object.getPosition();
        return new TWEEN.Tween(tweenObject)
                        .to(targetValue, 300)
                        .easing(TWEEN.Easing.Cubic.InOut)
                        .onUpdate(function()
                        {
                            object.setPosition(tweenObject);
                            unitLayer.draw();
                        })
    },
    
    rotationTween: function(object, targetValue)
    {
		// On repasse la valeur dans un intervalle [0;360]
		while(targetValue > 360)  targetValue -= 360;
		while(targetValue < -360) targetValue += 360;
		
		var delta = targetValue - object.getRotationDeg(); 
		
		// Permet d'éviter de se taper un tour complet dans le mauvais sens quand on passe de genre 340° à 0° (on aurait fait -340 au lieu de +20)
		if(delta < -180) targetValue += 360;
		if(delta > 180)  targetValue -= 360;

        var tweenObject = {rotation:object.getRotationDeg()};
        return new TWEEN.Tween(tweenObject)
                        .to({rotation:targetValue}, 300)
                        .easing(TWEEN.Easing.Cubic.InOut)
                        .onUpdate(function()
                        {
                            object.setRotationDeg(tweenObject.rotation);
                            unitLayer.draw();
                        })
    },
	
	log: function()
	{
		for(var a in arguments)
			console.log(arguments[a])
	},
	
	uv: function()
	{
		if(arguments.length == 1) return {u: arguments[0].u, v: arguments[0].v};
		if(arguments.length == 2) return {u: arguments[0], v: arguments[1]};
	},
	
	xy: function()
	{
		if(arguments.length == 1) return {x: arguments[0].x, y: arguments[0].y};
		if(arguments.length == 2) return {x: arguments[0], y: arguments[1]};
	},
	
	isEqual: function(a, b)
	{
		for(var key in a)
			if(a[key] != b[key]) return false;
		
		for(var key in b)
			if(b[key] != a[key]) return false;
			
		return true;
	}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// Global aliases for ease of use
var log = Utilities.log;
var uv = Utilities.uv;
var xy = Utilities.xy;
