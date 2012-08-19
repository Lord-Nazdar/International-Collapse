/*----------------------------------------------------------------

			mission1.js
			08/04/12
			
	File for the first mission

----------------------------------------------------------------*/

/*
	- Briefing
		° Titre
		° Description
		° Temps
		° Tache
	- Technique
		° Unitées
		° Carte
*/

var mission1 = {
	briefing:{
		title:"Debug Mission",
		description:"A very ugly worm is trying to destroy all of our work. Destroy him!",
		time:"5 min",
		task:[{
				title:"Destroy the scout",
				description:"Destroy the scout  in 3:2"
			},
			{
				title:"Kill them all",
				description:"Destroy all the Red Army"
			}]
	},
	technical:{
		units:[{
				type:"APC",
				position:{
					u:9,
					v:4
				},
				angle:4,
				team:1}
				],
		maps:"debarquement"
	}
}