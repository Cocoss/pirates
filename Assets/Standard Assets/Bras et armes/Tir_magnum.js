#pragma strict

var balles_chargeur = 6;
var balles_restantes = 24;
var son_tir : AudioClip;
private var peutTirer = true;
var etincelles : Transform;

function OnGUI() {
GUI.Label(Rect(Screen.width-100, Screen.height-50, 100, 25),  balles_chargeur + " / " + balles_restantes);
}

function Update(){

if(Input.GetButtonDown("Fire1") && peutTirer == true && balles_chargeur > 0){
	audio.PlayOneShot(son_tir);
	//SendMessageUpwards("Anime", 1); Ne fonctionne pas bien pour le moment faudra refaire des animations
	Tire();
	
}
if(Input.GetButtonDown("Fire1") && peutTirer == true && balles_chargeur == 0  && balles_restantes > 0){
	Recharge();
}

}


function Tire(){
peutTirer = false;

balles_chargeur --; 

var touche : RaycastHit;

	if(Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), touche, 100))
		{
		
		if(touche.collider)
			{
			
	print("touché ! ");
	var objet = Instantiate(etincelles, touche.point, Quaternion.identity);
	objet.transform.rotation = Quaternion.FromToRotation(Vector3.up, touche.normal);

	var cible;
	
				if (touche.collider.name == "Boat") 
					{touche.collider.gameObject.SendMessage("Degats");}
				else {	
					if (touche.collider.tag == "ennemi") 
					{touche.collider.gameObject.SendMessage("Degats");}
	}}
}


yield WaitForSeconds(0.2);
peutTirer = true;


}



function Recharge(){
peutTirer = false;
balles_restantes -= 6;
balles_chargeur += 6;
//SendMessageUpwards("Anime", 2); Ne fonctionne pas bien pour le moment faudra refaire des animations

yield WaitForSeconds(1.8);
peutTirer = true;
}

@RPC
function Sync_son(){
audio.PlayOneShot(son_tir);
}