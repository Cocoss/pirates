#pragma strict

var gamePaused : boolean = false;
function Start() {
 Time.timeScale = 1;
gameObject.GetComponent(Pause_Menu).enabled = false;
gameObject.GetComponent(Inventory).enabled = false;
   gameObject.GetComponent(MouseLook).enabled = true;
  gameObject.GetComponent(FPSInputController).enabled = true;
    gameObject.GetComponent(CharacterController).enabled = true;
  }  
function Update () {
 if(Input.GetKeyDown(KeyCode.Escape)){
 if (gamePaused) { 
 Time.timeScale = 1;
 gamePaused = false;
 gameObject.GetComponent(Pause_Menu).enabled = false;
   gameObject.GetComponent(MouseLook).enabled = true;
  gameObject.GetComponent(FPSInputController).enabled = true;
    gameObject.GetComponent(CharacterController).enabled = true;
  Screen.showCursor = false;
 }
 else {
  Time.timeScale = 0; gamePaused = true;
  gameObject.GetComponent(Pause_Menu).enabled = true;
  gameObject.GetComponent(MouseLook).enabled = false;
  gameObject.GetComponent(FPSInputController).enabled = false;
    gameObject.GetComponent(CharacterController).enabled = false;
 Screen.showCursor = true;
 }
}


 if(Input.GetKeyDown(KeyCode.I)){
 if (gamePaused) { 
 Time.timeScale = 1;
 gamePaused = false;
 gameObject.GetComponent(Inventory).enabled = false;
   gameObject.GetComponent(MouseLook).enabled = true;
  gameObject.GetComponent(FPSInputController).enabled = true;
    gameObject.GetComponent(CharacterController).enabled = true;
  Screen.showCursor = false;
 }
 else {
  Time.timeScale = 0; gamePaused = true;
  gameObject.GetComponent(Inventory).enabled = true;
  gameObject.GetComponent(MouseLook).enabled = false;
  gameObject.GetComponent(FPSInputController).enabled = false;
    gameObject.GetComponent(CharacterController).enabled = false;
 Screen.showCursor = true;
 }
}





}