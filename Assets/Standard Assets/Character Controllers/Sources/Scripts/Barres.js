#pragma strict
@script RequireComponent (Loot)

//variables

var Vie:float;
var Stamina:float;
var MaxFatigue:float;
var MaxVie:float;
var pognon:float;



function Update()
 {
 //Conversion en pourcentage
var recupMax = GetComponent(Carac);
MaxVie = recupMax.Maxsante;
MaxFatigue = recupMax.Maxendurence;
var recupVie = GetComponent(Loot);
var recupFatigue = GetComponent(Loot);

Vie = recupVie.sante * 100/MaxVie;
Stamina = recupFatigue.endurence * 100/MaxFatigue;
pognon = recupVie.coin;

}

//Interface barres

var barreHeight:float=150;
var barreWidth:float=160;
var customSkin:GUISkin;
var customStyle:GUIStyle;
var Health : Texture2D;
var Fatigue : Texture2D;

function OnGUI () {

GUI.skin= customSkin;
GUILayout.BeginArea(Rect(0,0,barreHeight,barreWidth),customStyle);
 GUI.DrawTexture(Rect(10, 10, Vie*1.5, 7),Health);
  GUI.DrawTexture(Rect(10, 20, Stamina*1.5, 7),Fatigue);
  GUI.Label(Rect(20,30,75,25),"Or : "+pognon);
   GUILayout.EndArea();
   
   }
