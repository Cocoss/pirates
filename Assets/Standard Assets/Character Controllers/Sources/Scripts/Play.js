#pragma strict
 Time.timeScale = 1;
 var exitbutton = false;
 var texte;
 texte = GetComponentInChildren(MeshRenderer);
 
 function OnMouseEnter(){
 renderer.material.color= Color.red;
 } 
 
 function OnMouseExit(){
 renderer.material.color= Color.white;
 }
 
  function OnMouseUp(){
  if (exitbutton == false){
  
  Application.Quit();
  
  }
  else {
  Application.LoadLevel(1);}
 }