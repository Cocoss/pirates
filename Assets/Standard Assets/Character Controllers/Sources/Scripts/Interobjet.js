


function Update(){

var quelquechose : RaycastHit;
var localisation:Vector3;
var bateau_roation:Quaternion;
var enface: GameObject;
var player: GameObject;
var siege: GameObject;

	//Si objet à moins de 5 mètres
	if(Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), quelquechose, 5))
		{
		
		if(quelquechose.collider != null)
			{ 
			enface = quelquechose.collider.gameObject;
			
			if (quelquechose.collider.tag == "Terrain") {SendMessageUpwards("pointeur",0);} else {
			
			if (quelquechose.collider.tag == "bateau"){
			
			
				print("Bateau ! ");
				SendMessageUpwards("pointeur",1);
				
				if (Input.GetKeyUp(KeyCode.F)) {
				//siege = enface.GetComponentInChildren(Siege)
				localisation=enface.transform.position;
				localisation.y= localisation.y + 1;
				localisation.z= localisation.z - 1;
				//localisation.z= localisation.z - 1.75;
				bateau_roation=enface.transform.rotation;
				player = GameObject.Find("FPS joueur");
				player.GetComponent(Inventory).enabled = false;
  				player.GetComponent("MouseLook").enabled = false;
 				player.GetComponent(FPSInputController).enabled = false;
   				player.GetComponent(CharacterController).enabled = true;
   				player.GetComponent(CharacterMotor).enabled = true;
   			    player.GetComponentInChildren(Camera).enabled = false;
   			   
   			   player.GetComponent(Transform).transform.position = localisation;
   		        player.GetComponent(Transform).transform.rotation = bateau_roation;
   		       //player.active =false;
   		      //gameObject.Find("Graphics").SetActiveRecursively(true);
				enface.GetComponentInChildren(Camera).enabled=true;
				enface.SendMessage("conduire",1);
				
				}
				
				
				
				
				
				} else {SendMessageUpwards("pointeur",0);
				
				if (quelquechose.collider == null){
				print("ciel");
				
				SendMessageUpwards("pointeur",0);}}
			
			
			}
			
			

	
}


 
} else {SendMessageUpwards("pointeur",0);}}



