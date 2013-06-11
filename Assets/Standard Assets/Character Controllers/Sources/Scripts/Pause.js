

var gamePaused : boolean = false;
public var isdialogues: boolean = false;
public var findialogues: boolean =false;
var i :int = 0;


function Start() {

//A l'état initial le jeu n'est pas en pause et les menus ne sont pas affichés
 	Time.timeScale = 1;
	gameObject.GetComponent(Pause_Menu).enabled = false;
	gameObject.GetComponent(Inventory).enabled = false;
    gameObject.GetComponent("MouseLook").enabled = true;
    gameObject.GetComponent(FPSInputController).enabled = true;
    gameObject.GetComponent(CharacterController).enabled = true;
  }  
  
  
function Update () {

	
//Menu Pause---------------------------------------------------------------------------------------------------
 if(Input.GetKeyDown(KeyCode.Escape))
 
	 {
	 
 if (gamePaused) 
 
 	{ 
 	
 Time.timeScale = 1;
 gamePaused = false;
 gameObject.GetComponent(Pause_Menu).enabled = false;
  gameObject.GetComponent("MouseLook").enabled = true;
  gameObject.GetComponentInChildren(Crosshair).enabled=true;
   	gameObject.GetComponentInChildren(Tir_magnum).enabled=true;
  gameObject.GetComponent(FPSInputController).enabled = true;
    gameObject.GetComponent(CharacterController).enabled = true;
  Screen.showCursor = false;
  
	} else {
	
  Time.timeScale = 0; gamePaused = true;
  gameObject.GetComponent(Pause_Menu).enabled = true;
 gameObject.GetComponent("MouseLook").enabled = false;
   gameObject.GetComponentInChildren(Crosshair).enabled=false;
   	gameObject.GetComponentInChildren(Tir_magnum).enabled=false;
  gameObject.GetComponent(FPSInputController).enabled = false;
    gameObject.GetComponent(CharacterController).enabled = false;
 Screen.showCursor = true;
 
 }
}

//Menu Inventaire---------------------------------------------------------------------------------------------
 if(Input.GetKeyDown(KeyCode.I) && isdialogues == false){
 if (gamePaused) { 
 Time.timeScale = 1;
 gamePaused = false;
 gameObject.GetComponent(Inventory).enabled = false;
gameObject.GetComponent("MouseLook").enabled = true;
  gameObject.GetComponent(FPSInputController).enabled = true;
    gameObject.GetComponent(CharacterController).enabled = true;
      gameObject.GetComponentInChildren(Crosshair).enabled=true;
   	gameObject.GetComponentInChildren(Tir_magnum).enabled=true;
  Screen.showCursor = false;
 }
 else {
  Time.timeScale = 0; gamePaused = true;
  gameObject.GetComponent(Inventory).enabled = true;
  gameObject.GetComponent("MouseLook").enabled = false;
  gameObject.GetComponent(FPSInputController).enabled = false;
    gameObject.GetComponent(CharacterController).enabled = false;
      gameObject.GetComponentInChildren(Crosshair).enabled=false;
   	gameObject.GetComponentInChildren(Tir_magnum).enabled=false;
 Screen.showCursor = true;
 }
} //Fin fonction KeyCode.I



//Menu Dialogues----------------------------------------------------------------------------------------------
if (isdialogues == true) {

	
 	gameObject.GetComponent("MouseLook").enabled = false;
 	    gameObject.GetComponent(FPSInputController).enabled = false;
 	    gameObject.GetComponentInChildren(Crosshair).enabled=false;
  	 	gameObject.GetComponentInChildren(Tir_magnum).enabled=false;
   	   	gameObject.GetComponentInChildren(Interobjet).enabled=false;
 		Screen.showCursor = true;
 } else {
 	if (findialogues==true){
 gameObject.GetComponent("MouseLook").enabled = true;
  gameObject.GetComponent(FPSInputController).enabled = true;
       gameObject.GetComponentInChildren(Crosshair).enabled=true;
   	gameObject.GetComponentInChildren(Tir_magnum).enabled=true;
   	   	gameObject.GetComponentInChildren(Interobjet).enabled=true;
 	isdialogues = false; 	
 	findialogues = false;
 	Screen.showCursor = false;
  	
	}

}




} //Fin de la fonction Update