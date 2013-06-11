

//Est-ce que le bateau est occupé ?
var ispilot: boolean = false;


//Force du moteur (devra être remplacé par une voile)
var engineForce = .01;

//Rudder torque coefficient for steering the boat
var rudder = 15;

//How far the direction of the propeller force is deflected by the rudder
var propellerTurningAngle = 20;

//drag coefficients along x,y and z directions
var drag = Vector3(6.0,4.0,0.2);

//angular drag coefficient
var angularDrag = 0.8;

//Hauteur du centre de gravité
var cogY = -0.5;

//max width, height and length of the boat (used for water dynamics)
var size = Vector3(3,3,10);

//particle system used for foam from the boat's propeller
var engineSpume : Transform;

private var rpmPitch = 0.0;
private var waterSurface = null;

var player: GameObject;

function Start()
{ 
	
	
	if(GetComponentInChildren(Collider) == null)
		Debug.Log("The Boat needs a collider to float on the water!");
}




//Setup de la caméra qui suit le bateau

function SetupCamera() {
	if(Camera.main.GetComponent(Vue_bateau) != null)
	{
		Camera.main.GetComponent(Vue_bateau).enabled=true;
		Camera.main.GetComponent(Vue_bateau).target=transform;
		Camera.main.GetComponent(Vue_bateau).distance=27;
		Camera.main.GetComponent(Vue_bateau).height=12;
	}
	Camera.main.transform.parent=null;
}


//Boat physics
//======================================================================

function FixedUpdate () {
	
	//if there is no water surface we are colliding with, no boat physics	
	if(waterSurface==null) {
	

	//query input axes if necessarry
	motor = 0.0;
	steer = 0.0;
	}
	
	if(ispilot == true)
	{
		motor = Input.GetAxis("Vertical");
		steer = Input.GetAxis("Horizontal");
	}
	
	//pouvoir sortir du mode "On Ride"
	if (Input.GetKeyUp(KeyCode.F) && ispilot ==true) {
				print("appuye sur F");
				player = GameObject.Find("FPSjoueur");
				player.GetComponent("MouseLook").enabled = true;
 				player.GetComponent(FPSInputController).enabled = true;
   				player.GetComponentInChildren(Camera).enabled = true;
   				player.GetComponent(Transform).transform.position =  player.GetComponent(Transform).transform.position;
   				gameObject.GetComponentInChildren(Camera).enabled = false;
   				 //réticule
   			   	player.GetComponentInChildren(Crosshair).enabled=true;
   			   	//tir
   			   	player.GetComponentInChildren(Tir_magnum).enabled=true;
   				ispilot = false;
	}
	

	//Niveau de l'eau y=0 et calcul du pourcentage en dessous de l'eau
	waterLevel=0;
	distanceFromWaterLevel = transform.position.y-waterLevel*lois_physiques.deltatemps;
	percentUnderWater = Mathf.Clamp01((-distanceFromWaterLevel + 0.5*size.y)/size.y);
	
	
	//Moteur--------------------------------------------------------------
	
	//position du "populseur"
	propellerPos = Vector3(0,-size.y*0.5,-size.z*0.5);
	propellerPosGlobal=transform.TransformPoint(propellerPos);
	

	if(ispilot == true)
	{
		
		//Force motrice------------------------------------------------------
				
		//Direction de la force motrice du bateau
		//mostly forward, rotated a bit according to steering angle
		steeringAngle = steer * propellerTurningAngle * Mathf.Deg2Rad;
		propellerDir = transform.forward*Mathf.Cos(steeringAngle) - transform.right*Mathf.Sin(steeringAngle)*lois_physiques.deltatemps;
		
		//On applique la force de propulsion
	
		rigidbody.AddForceAtPosition(propellerDir * engineForce * motor *lois_physiques.deltatemps, propellerPosGlobal);
		
		//print(propellerDir);
	    //print(propellerPosGlobal);
		
		
		//Frottements--------------------------------------------------------
		
		//Direction des fottements et force engendrée
		dragDirection = transform.InverseTransformDirection(rigidbody.velocity);
		dragForces = -Vector3.Scale(dragDirection,drag);
		//print("Dragdirection"+dragDirection);
		
		//On applique la force de frottement longitudinal
	    rigidbody.AddForce(transform.TransformDirection(dragForces)*0.5);
	    
	    //profondeur sous l'eau
	    depth = Mathf.Abs(transform.forward.y)*size.z*0.1+Mathf.Abs(transform.up.y)*size.y*0.1;
	    
	    //postion d'attaque des frottements
	    dragAttackPosition = Vector3(transform.position.x,waterLevel-depth,transform.position.z);
	    //print("dragAttackPosition"+dragAttackPosition);
	   // print(rigidbody.velocity.magnitude);
		rigidbody.AddForceAtPosition(transform.TransformDirection(dragForces)*rigidbody.velocity.magnitude*0.01,dragAttackPosition);
	    
	    forwardVelo = Vector3.Dot(rigidbody.velocity,transform.forward);
	   // print(forwardVelo);
		rigidbody.AddTorque(transform.up*forwardVelo*forwardVelo*rudder*steer*0.05);	
	}
	

	

}
