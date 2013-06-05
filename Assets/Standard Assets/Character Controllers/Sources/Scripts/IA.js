#pragma strict

var speed: float = 12;
var controller:CharacterController;
var moveDirection:Vector3;
var moveDirect:Vector3;
private var delayRotation:float;
private var changeDirection:float;
var anime:int = 0;
var newRotation:float;
var isdead: int=0;
var murderer: GameObject;

//Gestion des dégats du pnj

var vie: float = 100;

function Degats () {

vie = vie -20;
}


var newRotation2:float;

function Awake () {

	delayRotation = 2;
	
	
	controller = GetComponent(CharacterController);


}

function Update () {


	controller = GetComponent(CharacterController);

	newRotation = Random.Range(0,361);
	newRotation2 = Random.Range (-50,51);
	
	   	
   	if (vie > 0) 
   	
   	{	
   	
  	 	isdead = 0;		 
   				 			 			 
	 if (controller.isGrounded) {

	
 	moveDirection = Vector3.forward * speed * lois_physiques.deltatemps;
 	moveDirect = transform.TransformDirection(moveDirection);
	newRotation = Random.Range(0,361);
	newRotation2 = Random.Range (0,61);
 
 	//animation de run
				anime = 1;
				if (anime == 1) { 
				for (var state : AnimationState in animation) {
   				 state.speed = 0.7; animation.Play("run");}}
    
    
	 transform.rotation = Quaternion.Slerp(transform.rotation,Quaternion.Euler(0,newRotation,0),1 * lois_physiques.deltatemps);
   
	moveDirect.y -= lois_physiques.gravite * lois_physiques.deltatemps;
	
	controller.Move(moveDirect);
	
							  } else {moveDirect.y -= lois_physiques.gravite * lois_physiques.deltatemps;
 controller.Move(moveDirect); print("pas grounded ! ");}
    
			} else 	{

			if (isdead == 0) {anime = 2;
				if (anime == 2) { 
				for (var state : AnimationState in animation) {
   				 state.speed = 1;
   				    animation["die"].wrapMode = WrapMode.Once;
   				    animation.Play("die");
   				   murderer = GameObject.Find("FPS joueur");
   				   
   				    isdead = 1;
murderer.SendMessage("XP");
   				    
   				    
   				 }}
   				 } else {}
   				 }
   				 
   				 }






function OnControllerColliderHit (hit : ControllerColliderHit) {
	
	
	if (collider.tag == "coin" || collider.tag =="feu") {} else {

	
	
	if (hit.normal.x > 0.2 || hit.normal.z > 0.2) {
	transform.rotation = Quaternion.Slerp(transform.rotation, transform.rotation * Quaternion.Euler(0,newRotation2,0),0.5*lois_physiques.deltatemps);}

}
}
