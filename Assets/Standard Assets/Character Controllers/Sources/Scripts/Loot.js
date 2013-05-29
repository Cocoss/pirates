#pragma strict

@script RequireComponent (CharacterController)
@script AddComponentMenu ("Character/Character Motor")

var couleurs : Transform;
var Temps:float = 0;
var FinEffet:float = 25;
var Timer:float;

//Carac

	//Depuis Carac.Js
	
var Maxvie:float;
var Fatiguemax:float;
var recup:int;
var carac_endu:float;
var mult_endu:float;

	//Sur le perso
	
public var sante:float = 100;
var magie:float = 0;
public var endurence:float = 75;
var speed :float = 0;

//thune

var coin:float  = 0;


//update

function Update () {

//On recupere les variables maxendurence et récupération dans carac

	var recupMax = GetComponent(Carac);
	Fatiguemax = recupMax.Maxendurence;
	recup = recupMax.recuperation;
	

//On regle le timer

Timer = 0 + (recup*Time.deltaTime);

if (speed == 0) {Temps = 0;} else {
Temps = Temps+Time.deltaTime;
if (Temps >= FinEffet) {speed = 0;}}


//récupération de fatigue avec le temps

if (endurence + Timer > Fatiguemax) {endurence = endurence + (Fatiguemax - endurence);} 
else {
if (endurence == Fatiguemax) {}
 else {endurence = endurence + Timer;}
 



}

//Récupération endurence

carac_endu = recupMax.carac_endu;
mult_endu = 20-carac_endu;

if (endurence >= mult_endu){ 
if (Input.GetButtonUp("Jump")) {
if (endurence - mult_endu < 0){endurence = endurence - endurence;}
else {
if (endurence == 0) {endurence = endurence + Timer;}
else { 
endurence = endurence - mult_endu;}}
}}

//Variable santé max
Maxvie = recupMax.Maxsante;

}  

//Collider

function OnTriggerEnter(objetInfo : Collider)
{

//bonus speed

if (objetInfo.gameObject.tag == "speed")
	{
	speed = speed + 15;
	Destroy(objetInfo.gameObject);
}
else {

//argent

if (objetInfo.gameObject.tag == "coin")
	{
	coin = coin + 15;
	Destroy(objetInfo.gameObject);
}
else {

//Feu

if (objetInfo.gameObject.tag == "feu")
	{
	if (sante - 15 < 0) {sante = 0;}
	else {
	sante = sante -15;
}}
else {

//Soin

if (sante == Maxvie)
	{}
	
	else {
		if (objetInfo.gameObject.tag == "vie")
		{
	Instantiate(couleurs, transform.position, transform.rotation);
	Destroy(objetInfo.gameObject);
	if (sante + 25 > Maxvie) {sante = sante + (Maxvie - sante);}
	else {sante = sante +25;}
	
	
	}}
}}}
}



