/*----------------------------------------------------------------

			UnitEntity.js
			07/24/12
			
		Define all the functions about the units

----------------------------------------------------------------*/


var IUnitEntity =
{
	attack:null,	// Gere la visée le tir et les effets
	move:null,	// Gere le mouvement (avec lissage)
	face:null,	// Se tourner vers une direction particulière
	destroy:null,	// Explose / meurt, etc.
	idle:null,	// Animation d'idle (i.e. vibrer pour le tank ou regarder aux alentours pour l'inf)
	takedamage:null,	// Animation jouée quand un projectile est reçu
	
	appear:null,	// Apparition en fondu à un endroit particulier de la map.
	disappear:null	// Disparition en fondu aussi.
}


// Never instancied directly, always part of a squad
var Soldier = new Class
({


});

var SquadEntity = new Class
({	



});



var Entity = new Class
({
	initialize: function()
	{
		this.animations = [];
	},
	
	queueAnimation: function(tween)
	{
		this.animations.push(tween)
		if(this.animations.length == 1) tween(this);		
	},
	
	nextAnimation: function()
	{
		this.animations.shift();
		if(this.animations.length) this.animations[0](this);
	}

});






var VehicleEntity = new Class(Entity,
{
	initialize: function()
	{
		Entity.prototype.initialize.apply(this);
	
		this.container = new Kinetic.Group();
		this.container.add(this.hull);
		this.container.add(this.turret);
		
		unitLayer.add(this.container);
	},
	
	
	
	
	
	attack: function(position, callback)
	{		
		this.aim(hexCoordToScreenCoord(position), function(){});
		//this.fire()
		//etc.
        //Utilities.rotationTween(this.turret, this.turret.getRotationDeg() + 30).start(); 
	},
	
	face: function(direction, callback)
	{     	
        this.queueAnimation(function(self){
			Utilities.rotationTween(self.container, direction*60).onComplete(function(){self.nextAnimation(); callback()}).start();
		});
	},
	
	move: function(position, callback)
	{
        // Voir à décomposer le mouvement en plusieurs étapes, puis à faire une spline / du steering pour lisser les déplacements. A voir quand on aura le module de pathfinding.
		this.queueAnimation(function(self){
			Utilities.positionTween(self.container, hexCoordToScreenCoordCenter(position)).onComplete(function(){self.nextAnimation(); callback()}).start();
		});
	},
	
	
	
	
	/** Internal functions (not part of the IEntity interface) **/
	
	aim: function(position, callback)
	{
		// position x et y en pixels (coordonnées écran)
		//toGlobal() : this.turret.getPosition()
		//Calculer l'angle cible de la tourelle, avec toGlobalTrans(pos) et toLocalTrans(rot)
		
		this.chainAnimation(Utilities.rotationTween(this.turret, this.turret.getRotationDeg() + 30).onComplete(callback)); // Placeholder, on tourne la tourelle de 30 degrés histoire de vérifier que ça marche
	},
	
	fire: function(callback)
	{
	
	}
});



/*
var Inf = new Class(SquadEntity,
{

}
*/






        
var APCEntity = new Class(VehicleEntity,
{
    initialize:function()
    {        
        this.hull = new Kinetic.Image
		({
			image: Resources.Images["apc_hull"],
			centerOffset: {x:36, y:36},
			x: 0, y: 0,
			width: 74, height: 64
		});
		
		this.turret = new Kinetic.Image
		({
			image: Resources.Images["apc_turret"],
			centerOffset: {x:35, y:37},
			x: 0, y: 4,
			width: 74, height: 64
		});
        
        VehicleEntity.prototype.initialize.apply(this);
    }
});
        
   
 
var TankEntity = new Class(VehicleEntity,
{
    initialize:function()
    {        
        this.hull = new Kinetic.Image
		({
			image: Resources.Images["tank_hull"],
			centerOffset: {x:36, y:32},
			x: 0, y: 0,
			width: 74, height: 64
		});
		
		this.turret = new Kinetic.Image
		({
			image: Resources.Images["tank_turret"],
			centerOffset: {x:36, y:39},
			x: 0, y: 7,
			width: 74, height: 64
		});
        
        VehicleEntity.prototype.initialize.apply(this);
    }
});


// Evidemment les unités d'infantry ne sont pas des véhicules... :p
// J'ai juste mis ça en attendant d'avoir fini de coder le comportement des squads. Du coup on a juste les textures de debug avec les triangles, comme avant.
// C'est représenté par des véhicules sans tourelles et dont la coque a la texture du triangle
var PlaceholderEntity = new Class(VehicleEntity,
{
	initialize:function(type)
    {        
        this.hull = new Kinetic.Image
		({
			image: Resources.Images[type],
			centerOffset: {x:37, y:32},
			x: 0, y: 0,
			width: 74, height: 64
		});
		
		this.turret = new Kinetic.Group({x:0, y:0});
        
        VehicleEntity.prototype.initialize.apply(this);
    }
});
		
