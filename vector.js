/*----------------------------------------------------------------

			vector.js
			07/24/12
			
		Math about Vector

----------------------------------------------------------------*/


var vector =
{
	vectAB: function(A, B)
	{
		return uv(B.u-A.u,B.v-A.v);
	},
	
	distanceAB: function(A, B)
	{
		return Math.sqrt(((B.u-A.u)*(B.u-A.u))+((B.v-A.v)*(B.v-A.v)));
	},
	
	prodScal: function(AB, AC)
	{
		return AB.u*AC.u+AB.v*AC.v;
	},
	
	prodVect: function(AB, AC)
	{
		return AB.u*AC.u-AB.v*AC.v;
	},
	
	angleABC: function(A, B, C)
	{
		var AB = this.vectAB(A, B);
		var AC = this.vectAB(A, C);
		var Cangle = this.prodScal(AB,AC)/(this.distanceAB(A,B)*this.distanceAB(A,C));
		var Sangle = this.prodVect(AB,AC);
		
		if (Sangle>0)
			return Math.acos(Cangle);
		else
			return -Math.acos(Cangle);
	}
}
