partial class Vue_bateau { }
// The target we are following
var target : Transform;
// The distance in the x-z plane to the target
var distance = 10.0;
// the height we want the camera to be above the target
var height = 5.0;
// How much we 
var heightDamping = 2.0;
var rotationDamping = 3.0;

function Update() {transform.LookAt (target);}


// Place the script in the Camera-Control group in the component menu
//@AddComponentMenu("Camera-Control/Smooth Follow")


