#pragma strict

var vie: float = 100;
var anime:float =0;
function Degats () {

vie = vie -20;
}



function Update () {

if (vie <= 0) {anime = 2;
				if (anime == 2) { 
				for (var state : AnimationState in animation) {
   				 state.speed = 0.7; animation.Play("die");}}}

}