#pragma strict

function conduire (pilote: int)
{

if (pilote == 1){transform.parent.gameObject.GetComponent(Conduite).ispilot = true;}
else {pilote = 0;}
}