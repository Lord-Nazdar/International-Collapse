/*----------------------------------------------------------------

			UnitController.js
			07/24/12
			
		Control the moving of units

----------------------------------------------------------------*/


var UnitController = 
{
	unitElementList: [],
	units: [],
    
	getUnitAt: function (position)
	{
		for(id in this.units)
		    if(Utilities.isEqual(this.units[id].model.position, position))
			return this.units[id];
			
		return false;
	},

	addUnit: function (unitModel)
	{		
		var unitEntity;
	
		if(unitModel.type == "apc")		unitEntity = new APCEntity();	
		if(unitModel.type == "tank")	unitEntity = new TankEntity();	
		if(unitModel.type == "mlrs")	unitEntity = new PlaceholderEntity("mlrs");	
		if(unitModel.type == "inf")		unitEntity = new PlaceholderEntity("inf");		
		if(unitModel.type == "at")		unitEntity = new PlaceholderEntity("at");		
		if(unitModel.type == "sniper")	unitEntity = new PlaceholderEntity("sniper");		
	
		unitEntity.container.setPosition(hexCoordToScreenCoordCenter(unitModel.position));
		//unitLayer.add(unitEntity.container);
	
		var id = this.units.length;
		this.units[id] = {id: id, model: unitModel, entity: unitEntity};
	},

	moveUnit: function (id, position)
	{
		this.units[id].entity.move(position, function()
		{
			UnitController.units[id].model.position = uv(position);
		});
	},

	rotateUnit: function (id, angle)
	{
		this.units[id].entity.face(angle, function()
		{
			UnitController.units[id].model.angle = angle;
		});
	}
}
