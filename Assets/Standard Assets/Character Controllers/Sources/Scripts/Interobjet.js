


function Update(){

var quelquechose : RaycastHit;
var localisation:Vector3;
var bateau_roation:Quaternion;
var enface: GameObject;
var player: GameObject;
var siege: GameObject;

	//Si objet est visé à moins de 5 mètres
	if(Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), quelquechose, 5))
		{
		
		if(quelquechose.collider != null)
			{ 
			enface = quelquechose.collider.gameObject; //On stocke le gameObject visé
			if (quelquechose.collider.tag == "PNJ") {
			
			SendMessageUpwards("pointeur",2);} else {
			
			//Si l'objet est la commande d'un bateau
			if (quelquechose.collider.tag == "bateau"){
			
			//Le réticule se change en barre de gouvernail
				
				SendMessageUpwards("pointeur",1);
				
			//Si on appuye sur F on entre dans le bateau
				
				if (Input.GetKeyUp(KeyCode.F)) {
				
				//On prend la localisation de la commande de pilotage
				
				localisation=enface.transform.position;
			    localisation.y= localisation.y + 1;
				localisation.z = localisation.z - 1;
				bateau_roation=enface.transform.rotation;
				
				//On cherche le joueur et on désactive ses fonctions
				
				player = GameObject.Find("FPSjoueur");
				//souris
				player.GetComponent("MouseLook").enabled = false; 
				//controle du joueur
 				player.GetComponent(FPSInputController).enabled = false; 
 				//caméra
   			    player.GetComponentInChildren(Camera).enabled = false;
   			    //réticule
   			   	player.GetComponentInChildren(Crosshair).enabled=false;
   			   	//tir
   			   	player.GetComponentInChildren(Tir_magnum).enabled=false;
   			   	player.GetComponent(Rigidbody).velocity=Vector3.zero;
   			   	
   			   	//On place le personnage par rapport à la Barre
   			    player.GetComponent(Transform).transform.localPosition = localisation;
   		        player.GetComponent(Transform).transform.rotation = bateau_roation;
   		 
   		 	//On active la caméra du bateau
				enface.GetComponentInChildren(Camera).enabled=true;
			//On informe le bateau qu'il est sous notre controle
				enface.SendMessage("conduire",1);
				
				} 
				
			
				} 
				 //Sinon on remet le pointeur d'origine 
				else {SendMessageUpwards("pointeur",0);}
				
						
			
			}}else {SendMessageUpwards("pointeur",0);}
			
			

	
}}




