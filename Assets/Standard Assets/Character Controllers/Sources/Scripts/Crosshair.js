#pragma strict


var Croix:Texture2D;
var Hand:Texture2D;
var barre:Texture2D;
var reticule:Texture2D;



function pointeur (index :int) {

if (index == 0) {reticule = Croix;} else {
if (index == 1) {reticule = barre;}}





}



function OnGUI () { 



 GUI.DrawTexture(Rect(Screen.width/2, Screen.height/2,50,50),reticule);
 

   
   }