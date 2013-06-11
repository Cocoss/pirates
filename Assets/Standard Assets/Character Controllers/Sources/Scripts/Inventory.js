#pragma strict

private var GridValue : float = -1;
var GridPosition : Vector2 = new Vector2(10,2);
var GridSize : Vector2 = new Vector2(323,410);
var Grids : Texture[];

//interface variables
var invHeight:float=500;
var invWidth:float=800;
var buttonSpacing:float=10;
var titleTexture:Texture2D;
var customSkin:GUISkin;
var customStyle:GUIStyle;

//variables

var Maxsante:float;
var life:float;

var Maxmagie:float;
var magie:float;
var pouv_mag:float;

var Maxendurence:float; //dans carac
var recup:float;//capacité à la récupération de stamina
var endurence:int;//
var carac_endu:float;//dans carac

var nom:String;//carac
var grad:String;//carac
var niv:float;//carac
var strength:float;//force dans carac
var defense:float;


var vitesse : float;
var bonus_vitesse: float;
var bv;

var tira:float;
var tirf:float;

function Update() {

    var AddingNewItem : Loot = GetComponent(Loot);
    AddingNewItem.newItem();
    
//Recuperation des variables dans Carac et Loot
var recupc = GetComponent(Carac);
var recuploot = GetComponent(Loot);

//Attribution

nom = recupc.playername;
strength = recupc.force;
recup = recupc.recuperation;
niv = recupc.Niveau;
Maxsante = recupc.Maxsante;
Maxendurence = recupc.Maxendurence;
Maxmagie = recupc.Maxmagie;
life = recuploot.sante;
endurence = recuploot.endurence;
vitesse = recupc.vitesse;
bonus_vitesse = recuploot.speed;
grad = recupc.grad;
carac_endu = recupc.carac_endu;
defense = recupc.defense;
magie = recuploot.magie;
tira = recupc.tir_arc;
tirf = recupc.tir_feu;

//On affiche le bonus de carac que si il y en a un

if (bonus_vitesse > 0) {bv = " + "+bonus_vitesse;} else {bv = null;}

}

//Interface

function OnGUI () {

GUI.skin= customSkin;
GUILayout.BeginArea(Rect(Screen.width/2-230,Screen.height/2-invHeight/2,invHeight,invWidth),customStyle);
GUILayout.Space(50);
GUILayout.Label(titleTexture);
GUILayout.Space(buttonSpacing);
GUI.TextField(Rect(0,0,160,25),nom);
GUI.Box(Rect(0,25,160,400),"Caractéristiques : \n\nNiveau : "+niv+"\nGrade : "+grad
+"\nSanté : "+life+"/"+Maxsante+"\nEndurance : "+endurence+"/"+Maxendurence+"\nMagie : "+magie+"/"+Maxmagie
+"\nForce : "+strength+"\nDéfense : "+defense+"\nVitesse : "+vitesse+bv+"\nRécupération : "+recup
+"\nAthléthisme : "+carac_endu+"\nTir à l'arc : "+tira+"\nArmes à feu : "+tirf

);

   GUILayout.EndArea();
   GUI.Box(Rect((Screen.width/2-230)+160,Screen.height/2-invHeight/2,400,425),"Inventaire");
  GridValue = GUI.SelectionGrid(Rect((Screen.width/2-230)+160,Screen.height/2-invHeight/2+40,400,320), GridValue, Grids, 5);
    }
    
