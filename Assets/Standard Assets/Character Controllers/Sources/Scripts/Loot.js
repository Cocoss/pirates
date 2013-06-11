#pragma strict

//Gestion de l'inventaire

var TheInventory : Inventory;
var TheTextures : Besace;
var ArrayGrid = 0;
static var InventoryNewItemAdded = -1;
var BlankIcon : Texture;
var TheNewItem : Texture;


@script RequireComponent (CharacterController)
@script AddComponentMenu ("Character/Character Motor")

//Variables pour bonus

var couleurs : Transform;
var Temps:float = 0;
var FinEffet:float = 25;
var Timer:float;

//Caractéristiques

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

//Start----------------------------------------------------------------------------------------------------

function Start ()

{
    TheInventory = GetComponent(Inventory);
    TheTextures = GetComponent(Besace);
}

//Nouvel objet--------------------------------------------------------------------------------------------
function newItem ()

{
    if (Loot.InventoryNewItemAdded > -1)

    {
        TheNewItem = TheTextures.itemTexture[Loot.InventoryNewItemAdded];
        if (ArrayGrid < TheInventory.Grids.length)
        {
            if (TheInventory.Grids[ArrayGrid] == BlankIcon)

            {
                TheInventory.Grids[ArrayGrid] = TheNewItem;
                ArrayGrid = 0;
                Loot.InventoryNewItemAdded = -1;
            }

            else if (TheInventory.Grids[ArrayGrid] != BlankIcon)

            {
                ArrayGrid += 1;
            }
        }
    }
}


//update-----------------------------------------------------------------------------------------------------

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

//Collider--------------------------------------------------------------------------------------------------

function OnTriggerEnter(objetInfo : Collider)
{


	if (objetInfo != null) {
	
		//bonus speed
			if (objetInfo.gameObject.tag == "speed")
			{
			speed = speed + 15;
			Destroy(objetInfo.gameObject);
			}

		//argent
		
		if (objetInfo.gameObject.tag == "coin")
			{
			coin = coin + 15;
			Destroy(objetInfo.gameObject);
		}
		//Feu
		
		if (objetInfo.gameObject.tag == "feu")
			{
			if (sante - 15 < 0) {sante = 0;}
			else {
			sante = sante -15;
		}}

		//Soin
		
		if (sante == Maxvie){}
			else {
				if (objetInfo.gameObject.tag == "vie")
				{
			Instantiate(couleurs, transform.position, transform.rotation);
			Destroy(objetInfo.gameObject);
			if (sante + 25 > Maxvie) {sante = sante + (Maxvie - sante);}
			else {sante = sante +25;}
			
			
			}}
			
		
						//Bois				
		if (objetInfo.gameObject.tag == "Bois")
			{		
				Destroy(objetInfo.gameObject);
		        Besace.itemPlayersAmount[0] += 1;
		        Loot.InventoryNewItemAdded = 0;
	
			}
			//Chanvre
		if (objetInfo.gameObject.tag == "Chanvre")
			{		
				Destroy(objetInfo.gameObject);
		        Besace.itemPlayersAmount[1] += 1;
		        Loot.InventoryNewItemAdded = 1;
	
			}

		//Fer
		if (objetInfo.gameObject.tag == "Fer")
			{		
				Destroy(objetInfo.gameObject);
		        Besace.itemPlayersAmount[2] += 1;
		        Loot.InventoryNewItemAdded = 2;
	
			}
}}