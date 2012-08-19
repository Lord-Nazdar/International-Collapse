/*----------------------------------------------------------------

			Ressources.js
			07/24/12
			
			Ressource loader

----------------------------------------------------------------*/


var Resources = 
{
    domain:"",//"http://apparencestudio.com/stratJS/",
    Images:
    {
        list: [],
        load: function ()
        {
            for(i in Resources.Images.list)
            {
                var img = Resources.Images.list[i];
                Resources.Images[img] = new Image();
                Resources.Images[img].src = Resources.domain + "images/" + img + ".png";
            }
        }
    },
    
    Audio:
    {
        list: [],
        load: function ()
        {
            for(i in Resources.Audio.list)
            {
                var snd = Resources.Audio.list[i];
                Resources.Audio[snd] = new Audio();
                Resources.Audio[snd].src = Resources.domain + "audio/" + snd;
            }
        }
    }
}
