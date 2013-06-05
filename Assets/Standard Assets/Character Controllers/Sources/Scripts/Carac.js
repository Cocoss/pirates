#pragma strict

var bonus_speed:float;


 //Personnage
 
var playername: String = "Joueur";
var grad: String = "Mousse"; //Grade de marin
var Niveau:float = 1;
var experience:float =0;


 //Caractéristiques 

var carac_endu:int = 4; //Athlétisme, pour savoir combien d'énergie cela enleve de sauter etc..., agit sur la capacité de portage
public var Maxsante:float = 100; //Santé max
var Maxmagie:float = 0; //Magie Max
var Maxendurence:float = 75; //Endurence à l'effort max
public var force:float = 6; //force melée, agit aussi sur la capacité de portage
var tir_arc:float = 3; //degat tir à l'arc
var tir_feu:float = 3; // degat tir par arme à feu
var cap_portage:float = ((2*force)+(2*carac_endu))+100; //capacité de portage d'objets
var defense:float = 4;
var pouv_magie:float =0; //Puissance magique
var recuperation:int = 2; //Vitesse de récupération de l'effort
var vitesse:float = 5; //Vitesse de déplacement
var carac_vitesse:float; //Bonus de vitesse



function Start () {

}

function Update () {

var recuploot = GetComponent(Loot);
bonus_speed = recuploot.speed;

carac_vitesse = vitesse + bonus_speed;

}

function XP (){

experience = experience +10;
}