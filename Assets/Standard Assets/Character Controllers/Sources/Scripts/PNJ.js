#pragma strict

var menuHeight:float=500;
var menuWidth:float=500;
var buttonSpacing:float=50;
var titleTexture:Texture2D;
var customSkin:GUISkin;
var customStyle:GUIStyle;
var player: GameObject;
var choix:int =1;

var dialOn: boolean = false;

var phrase:String;
var question;


var intro: String = "Que puis-je pour vous ?";
var reponse1: String = "Vous n'avez pas honte ?!!!";
var reponse2: String = "Vous me semblez bien curieux !";
var reponse3: String = "Cela ne vous regarde pas !";
var bye1: String = "Salut !";


var question1:String = "Tu veux voir mon zob ?";
var question2:String = "Comment s'appelle cette île ?";
var question3:String = "Qui êtes vous ?";
var bye2: String = "Au revoir !";

var phrase2:String;


function Update () {

	player = GameObject.Find("FPSjoueur");
				
			phrase = phrase2;
				
			if (choix == 0) {phrase2 = intro;} else {
				if (choix == 1) {phrase2 = reponse1;} else {
				if (choix == 2) {phrase2 = reponse2;} else {
				if (choix == 3) {phrase2 = reponse3;} else {
					if (choix == 4) {phrase2 = bye1;} else {
				}}}}}

	
				
		if (player.GetComponent(Pause).isdialogues == false) {dialOn = false;}
		else {dialOn = true;}



}




 
  



