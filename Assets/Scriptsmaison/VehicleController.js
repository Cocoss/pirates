//Controller script to choose a vehicle from a 
//supplied list of vehicles, and control it.

var vehicles : GameObject[];
private var selected=0;
private var controlling = false;
private var keyPress = false;
private var selectTime = 0.0;

function Start () {
	for(v in vehicles)
		v.BroadcastMessage("SetEnableUserInput",false);
}

function Update () {
	
	//are we controlling a vehicle?
	if(controlling)
	{
		//if user presses select button, choose another vehicle
		if(!keyPress)
		{
			if(Input.GetKey("return"))
			{
				keyPress=true;
				controlling=false;
			}
		}
		else
			keyPress=Input.GetKey("left")||Input.GetKey("right")||Input.GetKey("return");
					
		//get status message from vehicle
		if(Time.time-selectTime<3.0)
			vehicles[selected].SendMessage("GetControlString",guiText);
		else
			vehicles[selected].SendMessage("GetStatus",guiText);
	}
	
	//choose a vehicle
	else
	{
		//focus camera on selectec vehicle
		vehicles[selected].SendMessage("SetupCamera");
		
		guiText.text = "Choose your vehicle!\nHit left/right to choose\nreturn to select.";
		
		//query input
		if(!keyPress)
		{
			if(Input.GetKey("left"))
			{
				keyPress=true;
				selected--;
			}
			if(Input.GetKey("right"))
			{
				keyPress=true;
				selected++;
			}
			selected = (selected + vehicles.length) % vehicles.length;
			if(Input.GetKey("return"))
			{
				//select vehicle
				keyPress=true;
				controlling=true;
				selectTime=Time.time;
				for(v in vehicles)
					v.BroadcastMessage("SetEnableUserInput",false);
				vehicles[selected].BroadcastMessage("SetEnableUserInput",true);
			}
		}
		else
			keyPress=Input.GetKey("left")||Input.GetKey("right")||Input.GetKey("return");
	}
}