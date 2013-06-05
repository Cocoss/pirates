#pragma strict

//Vitesse de rotation de capsule

var vitesse1:float = 2;
var vitesse2:float = 4;

function Update () {
transform.Rotate(Vector3(0,vitesse1,vitesse2));

}