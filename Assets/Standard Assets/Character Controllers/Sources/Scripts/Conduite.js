var ispilot: boolean = false;


//Force of the boats engine
var engineForce = .01;
//Rudder torque coefficient for steering the boat
var rudder = 40;
//How far the direction of the propeller force is deflected by the rudder
var propellerTurningAngle = 20;
//drag coefficients along x,y and z directions
var drag = Vector3(6.0,4.0,0.2);
//angular drag coefficient
var angularDrag = 0.8;
//heigh of center of gravity
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

//Functions to be used by external scripts 
//controlling the boat if required
//===================================================================


//Setup main camera to follow boat
function SetupCamera() {
	if(Camera.main.GetComponent(SmoothFollow) != null)
	{
		Camera.main.GetComponent(SmoothFollow).enabled=true;
		Camera.main.GetComponent(SmoothFollow).target=transform;
		Camera.main.GetComponent(SmoothFollow).distance=11;
		Camera.main.GetComponent(SmoothFollow).height=3;
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
	
	if (Input.GetKeyUp(KeyCode.F) && ispilot ==true) {
				print("appuye sur F");
				player = GameObject.Find("FPS joueur");
				player.GetComponent("MouseLook").enabled = true;
 				player.GetComponent(FPSInputController).enabled = true;
   				player.GetComponent(CharacterController).enabled = true;
   				player.GetComponent(CharacterMotor).enabled = true;
   				player.GetComponentInChildren(Camera).enabled = true;
   				player.GetComponent(Transform).transform.position =  player.GetComponent(Transform).transform.position;
   				gameObject.GetComponentInChildren(Camera).enabled = false;
   				ispilot = false;
	}
	

	//get water level and percent under water
	waterLevel=0;
	distanceFromWaterLevel = transform.position.y-waterLevel;
	percentUnderWater = Mathf.Clamp01((-distanceFromWaterLevel + 0.5*size.y)/size.y);
	
	
	//Engine
	//--------------------------------------------------------------
	
	//calculate propeller position
	propellerPos = Vector3(0,-size.y*0.5,-size.z*0.5);
	propellerPosGlobal=transform.TransformPoint(propellerPos);
	

	if(ispilot == true)
	{
		//direction propeller force is pointing to.
		//mostly forward, rotated a bit according to steering angle
		steeringAngle = steer * propellerTurningAngle * Mathf.Deg2Rad;
		propellerDir = transform.forward*Mathf.Cos(steeringAngle) - transform.right*Mathf.Sin(steeringAngle);
		
		//apply propeller force
		rigidbody.AddForceAtPosition(propellerDir * engineForce * motor , propellerPosGlobal);
		
		print(propellerDir);
		print(propellerPosGlobal);
		
		dragDirection = transform.InverseTransformDirection(rigidbody.velocity);
		dragForces = -Vector3.Scale(dragDirection,drag);
		print("Dragdirection"+dragDirection);
	    rigidbody.AddForce(transform.TransformDirection(dragForces)*0.5);
	    
	    depth = Mathf.Abs(transform.forward.y)*size.z*0.1+Mathf.Abs(transform.up.y)*size.y*0.1;
	    dragAttackPosition = Vector3(transform.position.x,waterLevel-depth,transform.position.z);
	    print("dragAttackPosition"+dragAttackPosition);
	//rigidbody.AddForceAtPosition(transform.TransformDirection(dragForces)*rigidbody.velocity.magnitude*(1+percentUnderWater*7),dragAttackPosition);
	    
	    forwardVelo = Vector3.Dot(rigidbody.velocity,transform.forward);
	rigidbody.AddTorque(transform.up*forwardVelo*forwardVelo*rudder*steer*0.01);	
	}
	

	

}
