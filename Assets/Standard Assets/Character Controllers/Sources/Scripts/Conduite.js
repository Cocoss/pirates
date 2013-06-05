var ispilot: boolean = false;

//Mass
var mass = 3000;
//Force of the boats engine
var engineForce = 10000.0;
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
//volume of boat in liters (the higher the volume, the higher the boat will floar)
var volume = 9000;

//particle system used for foam from the boat's propeller
var engineSpume : Transform;

private var queryUserInput = true;
private var rpmPitch = 0.0;
private var waterSurface = null;

function Start()
{ 
	
	
	if(GetComponentInChildren(Collider) == null)
		Debug.Log("The Boat needs a collider to float on the water!");
}

//Functions to be used by external scripts 
//controlling the boat if required
//===================================================================

//return a status string for the vehicle
function GetStatus(status : GUIText) {
	status.text="v="+(rigidbody.velocity.magnitude * 3.6).ToString("f1") + " km/h";
}

//return an information string for the vehicle
function GetControlString(info : GUIText) {
	info.text="Use arrow keys to control the boat.";
}

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

//Enable or disable user controls
function SetEnableUserInput(enableInput)
{
	queryUserInput=enableInput;
}

//Boat physics
//======================================================================

function FixedUpdate () {
	
	//if there is no water surface we are colliding with, no boat physics	
	if(waterSurface==null) {
		return;}

	//query input axes if necessarry
	motor = 0.0;
	steer = 0.0;
	
	if (ispilot == true) {
	if(queryUserInput)
	{
		motor = Input.GetAxis("Vertical");
		steer = Input.GetAxis("Horizontal");
	}
	
	if (Input.GetKeyUp(KeyCode.F)) {
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
	}

	//get water level and percent under water
	waterLevel=waterSurface.collider.bounds.max.y;
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
		
	
	}
	
	//Drag
	//--------------------------------------------------------------
	
	//calculate drag force
	dragDirection = transform.InverseTransformDirection(rigidbody.velocity);
	dragForces = -Vector3.Scale(dragDirection,drag);
	
	//depth of the boat under water (used to find attack point for drag force)
	depth = Mathf.Abs(transform.forward.y)*size.z*0.5+Mathf.Abs(transform.up.y)*size.y*0.5;
	
	//apply force
	dragAttackPosition = Vector3(transform.position.x,waterLevel-depth,transform.position.z);
	rigidbody.AddForceAtPosition(transform.TransformDirection(dragForces)*rigidbody.velocity.magnitude*(1+percentUnderWater*(waterSurface.waterDragFactor-1)),dragAttackPosition);
	
	//linear drag (linear to velocity, for low speed movement)
	rigidbody.AddForce(transform.TransformDirection(dragForces)*500);
	
	//rudder torque for steering (square to velocity)
	forwardVelo = Vector3.Dot(rigidbody.velocity,transform.forward);
	rigidbody.AddTorque(transform.up*forwardVelo*forwardVelo*rudder*steer);	
	
	//Sound
	//--------------------------------------------------------------
	
	audio.volume=0.3+Mathf.Abs(motor);

	//slowly adjust pitch to power input
	rpmPitch=Mathf.Lerp(rpmPitch,Mathf.Abs(motor),Time.deltaTime*0.4);
	audio.pitch=0.3+0.7*rpmPitch;

	//reset water surface, so we have to stay in contact for boat physics.
	waterSurface = null;
}

function OnTriggerStay(coll)
{
	if(coll.GetComponent(FloatableWater)!=null)
		waterSurface=coll.GetComponent(FloatableWater);
}

//Called by DamageReceiver if boat destroyed
function Detonate()
{
	//no more boat force => sink
	enabled=false;
	
	//Mark object no longer a target for homing missiles.
	if(tag=="MissileTarget")
		tag="";
}

@script RequireComponent (AudioSource)