/*----------------------------------------------------------------

			Class.js
			07/24/12
			
		Class definition

----------------------------------------------------------------*/


function Class()
{
	var _class = function(){return this.initialize.apply(this, arguments);};
	_class.prototype.initialize = function(){};
	
	for(var a in arguments)
		$.extend(_class.prototype, arguments[a].prototype || arguments[a]);
	
	return _class;
}

/*
var Signal = new Class
({
	initialize:function()
	{
		this._slots = [];
	},
	
	connect:function()
	{
		var _slot;
		
		if(arguments.length == 1)
			_slot = arguments[0];
			
		if(arguments.length == 2)
		{
			var _instance = arguments[0];
			var _method = arguments[1];
			
			if(typeof _method == "string")
				_method = _instance[_method];
			
			_slot = function(){_method.apply(_instance, arguments)};
		}
				
		if(_slot)
			this._slots.push(_slot);
	},
	
	emit:function()
	{
		for(var i in this._slots)
			this._slots[i].apply(arguments);
	}
});


var k =
{
    lol:function(){alert("lol")},
    mdr:function(a){alert("mdr");alert(a)}
}

var j =
{
    ptdr:new Signal,
	gg:new Signal
}

function omg(rly){alert("OMG " + rly)};
    
j.ptdr.connect(k, 'lol');
j.gg.connect(k, 'mdr');
j.gg.connect(omg)
j.gg.connect(function(){k.mdr.apply(arguments)});

j.ptdr.emit();
j.gg.emit("haha");



j.ptdr.connect(k.mdr);
j.ptdr.emit();*/
