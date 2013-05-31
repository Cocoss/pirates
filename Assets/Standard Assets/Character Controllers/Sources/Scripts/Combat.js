#pragma strict

var vie: float = 100;

function Degats () {

vie = vie -20;
}



function Update () {

if (vie <= 0) {Destroy(gameObject);}

}