/*----------------------------------------------------------------

			UnitModel.js
			07/24/12
			
	Define all the attributes of the units

----------------------------------------------------------------*/


// Représente une unité sur le plateau

var UnitModel = new Class
({
	initialize: function(type, position, dir, side)
	{
		this.type = type;
		this.position = uv(position);
		this.dir = dir;
		this.hp = unitInfo[type].maxHP;
		this.side = side;
		this.MP =  unitInfo[type].speed;
		this.AP = 1;
	}
});


// Liste des caractéristiques de chaque unité
// move : terrain traversable
// move value order
// water grass mountain sand forest

var unitInfo = 
{
    "apc":{
        type:"armor",
        maxHP:4,
        armor:[2, 1, 1, 1, 1, 0],
        speed:4,
		move : [0,1,3],
        attack:{
            "armor":{range:2, damage:0.1, direct:true},
            "light":{range:2, damage:3, direct:true}
        },
		deploy:3
    },
    
    "at":{
        type:"light",
        maxHP:2,
        armor:[0, 0, 0, 0, 0, 0],
        speed:2,
		move : [1,3,4],
        attack:{
            "armor":{range:2, damage:5, direct:true},
            "light":{range:1, damage:0.1, direct:true}
        },
		deploy:1
    },
    
    "inf":{
        type:"light",
        maxHP:2,
        armor:[0, 0, 0, 0, 0, 0],
        speed:2,
		move : [1,3,4],
        attack:{
            "armor":{range:1, damage:0.5, direct:false},
            "light":{range:1, damage:2, direct:true}
        },
		deploy:1
    },
    
    "mlrs":{
        type:"armor",
        maxHP:1,
        armor:[1, 0, 0, 0, 0, 0],
        speed:2,
		move : [1],
        attack:{
            "armor":{range:8, damage:2, direct:false},
            "light":{range:8, damage:0.1, direct:false}
        },
		deploy:6
    },
    
    "sniper":{
        type:"light",
        maxHP:1,
        armor:[0, 0, 0, 0, 0, 0],
        speed:2,
		move : [1,3,4],
        attack:{
            "armor":{range:1, damage:.1, direct:false},
            "light":{range:6, damage:2, direct:true}
        },
		deploy:6
    },
    
    "tank":{
        type:"armor",
        maxHP:4,
        armor:[3, 2, 2, 1, 1, 0],
        speed:3,
		move : [1,3],
        attack:{
            "armor":{range:2, damage:3, direct:true},
            "light":{range:2, damage:0.1, direct:true}
        },
		deploy:3
    }
}
