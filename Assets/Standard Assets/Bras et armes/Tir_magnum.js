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

if(Input.GetButtonDown("Tirer") && peutTirer == true && balles_chargeur > 0){
	Tire();
}
if(Input.GetButtonDown("Tirer") && peutTirer == true && balles_chargeur == 0  && balles_restantes > 0){
	Recharge();
}

}


function Tire(){
peutTirer = false;

SendMessageUpwards("Anime", 1);
balles_chargeur --; 

var touche : RaycastHit;

if(Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), touche, 100)){
	if(touche.collider){
	var objet = Instantiate(etincelles, touche.point, Quaternion.identity);
	objet.transform.rotation = Quaternion.FromToRotation(Vector3.up, touche.normal);
	Network.Instantiate(etincelles, objet.transform.position, objet.transform.rotation, 0);
	Destroy(objet.gameObject);
	}
}

networkView.RPC("Sync_son", RPCMode.All);

yield WaitForSeconds(0.2);
peutTirer = true;


}



function Recharge(){
peutTirer = false;
balles_restantes -= 6;
balles_chargeur += 6;
SendMessageUpwards("Anime", 2);

yield WaitForSeconds(1.8);
peutTirer = true;
}

@RPC
function Sync_son(){
audio.PlayOneShot(son_tir);
}