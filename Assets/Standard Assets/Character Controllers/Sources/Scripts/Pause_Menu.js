#pragma strict

var menuHeight:float=500;
var menuWidth:float=500;
var buttonSpacing:float=25;
var mainMenu = "Mainmenu";
var titleTexture:Texture2D;
var customSkin:GUISkin;
var customStyle:GUIStyle;

function OnGUI () {

GUI.skin= customSkin;
GUILayout.BeginArea(Rect(Screen.width/2-menuWidth/2,Screen.height/2-menuHeight/2,menuHeight,menuWidth),customStyle);
GUILayout.Space(50);
GUILayout.Label(titleTexture);
GUILayout.Space(buttonSpacing);

   if (GUILayout.Button ("Menu")) {Application.LoadLevel(0);}
 GUILayout.Space(buttonSpacing);
   if (GUILayout.Button ("Quitter")) {Application.Quit();}  
  GUILayout.Space(buttonSpacing);  
   GUILayout.EndArea();
   }
