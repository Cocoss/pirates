#pragma strict

var dial:boolean = false;

//Paramètres de la fenetre
var menuHeight:float=500;
var menuWidth:float=500;
var buttonSpacing:float=50;
var titleTexture:Texture2D;
var customSkin:GUISkin;
var customStyle:GUIStyle;

//Variables textes
var phrase: String;

var quest1:String;
var quest2:String;
var quest3:String;
var bye:String;

var rep1:String;
var rep2:String;
var rep3:String;
var rep4:String;
var player: GameObject;

function OnGUI() {

if (dial == false) {}

else {


GUI.skin= customSkin;
GUILayout.BeginArea(Rect(Screen.width/4,Screen.height*0.66,Screen.width*0.50,Screen.height*0.10),customStyle);
GUILayout.Space(buttonSpacing);
GUI.TextArea(Rect(0,0,Screen.width*0.50,Screen.height*0.10),phrase,200);
GUILayout.Space(buttonSpacing);
GUILayout.EndArea();
GUILayout.BeginArea(Rect(Screen.width/4,Screen.height*0.76,Screen.width*0.50,Screen.height*0.23),customStyle);
        if (GUILayout.Button (quest1)) {phrase = rep1;}
         if (GUILayout.Button (quest2)) {phrase = rep2;} 
          if (GUILayout.Button (quest3)) {phrase = rep3;} 
           if (GUILayout.Button (bye)) {phrase = rep4;
          // yield WaitForSeconds(1);
           	player = GameObject.Find("FPSjoueur");
				player.GetComponent(Pause).isdialogues = false;
				player.GetComponent(Pause).findialogues = true;
				dial = false;
           }
           
GUILayout.EndArea();
}

}

	
				
							
function Update(){

var quelqun : RaycastHit;
var localisation:Vector3;
var enface: GameObject;



	//Si objet est visé à moins de 3 mètres
	if(Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), quelqun, 4))
		{
		
		if(quelqun.collider != null)
			{ 
			enface = quelqun.collider.gameObject; //On stocke le PNJ visé
			
			if (quelqun.collider.tag == "PNJ") {
			
			SendMessageUpwards("pointeur",2);
			
			
			//Si l'objet est le terrain on change rien
						
				if (Input.GetKey(KeyCode.F) && dial== false){
				
				dial = true;
				print ("discuter");
				//On freeze la position du personnage pendant la scene de dialogue
				player = GameObject.Find("FPSjoueur");
				player.GetComponent(Pause).isdialogues = true;
 				enface.GetComponent(PNJ).dialOn = true;
 				
 				phrase = enface.GetComponent(PNJ).intro;
 				quest1 = enface.GetComponent(PNJ).question1;
 				quest2 = enface.GetComponent(PNJ).question2;
 				quest3 = enface.GetComponent(PNJ).question3;
 				bye = enface.GetComponent(PNJ).bye2;
 				
 				rep1 = enface.GetComponent(PNJ).reponse1;
 				rep2 = enface.GetComponent(PNJ).reponse2;
 				rep3 = enface.GetComponent(PNJ).reponse3;
 				rep4 = enface.GetComponent(PNJ).bye1;
 				
				}}
				
				
				
				}else {SendMessageUpwards("pointeur",0);}
				
				
				
				if (Input.GetKeyDown(KeyCode.F) && dial== true){
				player = GameObject.Find("FPSjoueur");
				player.GetComponent(Pause).isdialogues = false;
				player.GetComponent(Pause).findialogues = true;
				dial = false;
 				}
 				
				}}