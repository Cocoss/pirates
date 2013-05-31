#pragma strict

var speed: int = 3;
var controller:CharacterController;
var moveDirection:Vector3;
private var direct;
private var delayRotation:float;
private var changeDirection:float;
var anime:int = 0;
var newRotation:float;

@System.NonSerialized
var groundNormal : Vector3 = Vector3.zero;

private var lastGroundNormal : Vector3 = Vector3.zero;

var newRotation2;

function Awake () {

	delayRotation = 2;
	
	controller = GetComponent(CharacterController);


}

function Update () {
 moveDirection = Vector3.forward * speed * Time.deltaTime;
 transform.Translate(moveDirection);
	newRotation = Random.Range(0,361);
	newRotation2 = Random.Range (-50,51);
 
 	//animation de run
				anime = 1;
				if (anime == 1) { 
				for (var state : AnimationState in animation) {
   				 state.speed = 0.7; animation.Play("run");}}
    
    
   transform.rotation = Quaternion.Slerp(transform.rotation,Quaternion.Euler(0,newRotation,0),1 * Time.deltaTime);
   
 	moveDirection.y -= lois_physiques.gravite;
   controller.Move(moveDirection * Time.deltaTime );
    
}


function OnControllerColliderHit (hit : ControllerColliderHit) {
	
	
	if (collider.tag == "coin" || collider.tag =="feu") {} else {
	
	
	transform.rotation = Quaternion.Slerp(transform.rotation, transform.rotation * Quaternion.Euler(0,newRotation2,0),0.5*lois_physiques.deltatemps);

}
}
