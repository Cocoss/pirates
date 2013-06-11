//Paramètres de la fenetre
var menuHeight:float=500;
var menuWidth:float=500;
var buttonSpacing:float=50;
var titleTexture:Texture2D;
var customSkin:GUISkin;
var customStyle:GUIStyle;
var panel: boolean = false;
var bateau:Transform;
var localisation:Vector3;

function Update(){

var quelquechose : RaycastHit;

var enface: GameObject;
var player: GameObject;


	//Si objet est visé à moins de 5 mètres
	if(Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), quelquechose, 3))
		{
		
		if(quelquechose.collider != null)
			{ 
			enface = quelquechose.collider.gameObject; //On stocke le gameObject visé
			localisation=enface.transform.position;
			    localisation.y= localisation.y + 1;
				localisation.x = localisation.x - 3;
								
		if (quelquechose.collider.tag == "craft" && Input.GetKey(KeyCode.R)) {
		
		panel = true;
		player = GameObject.Find("FPSjoueur");
				//souris
				player.GetComponent("MouseLook").enabled = false; 
				//controle du joueur
 				player.GetComponent(FPSInputController).enabled = false; 
		player.GetComponentInChildren(Tir_magnum).enabled=false;
		print("cool");}
		
		}
		}
		}
		
function OnGUI(){

if (panel == true) {

GUI.skin= customSkin;
GUILayout.BeginArea(Rect(Screen.width/4,Screen.height*0.66,Screen.width*0.50,Screen.height*0.10),customStyle);
GUILayout.Space(buttonSpacing);
GUI.TextArea(Rect(0,0,Screen.width*0.50,Screen.height*0.10),"Chantier naval",200);
GUILayout.Space(buttonSpacing);
GUILayout.EndArea();
GUILayout.BeginArea(Rect(Screen.width/4,Screen.height*0.76,Screen.width*0.50,Screen.height*0.23),customStyle);
	if (GUILayout.Button ("Mettre la coque !")) { 
	
	Instantiate(bateau, localisation, Quaternion.identity);
	}
	if (GUILayout.Button ("Quitter")) { 
	
	panel = false;
		player = GameObject.Find("FPSjoueur");
				//souris
				player.GetComponent("MouseLook").enabled = true; 
				//controle du joueur
 				player.GetComponent(FPSInputController).enabled = true; 
 				player.GetComponentInChildren(Tir_magnum).enabled=true;
	}
GUILayout.EndArea();
}
}