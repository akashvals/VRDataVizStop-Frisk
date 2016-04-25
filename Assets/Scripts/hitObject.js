#pragma strict
import UnityEngine.UI;

var panel: GameObject;
var scoreDisplay: Text;
private var scope : GameObject;
private var speedE : boolean;
private var go : GameObject;

function Start(){

	scope = transform.GetChild(2).gameObject;
	speedE = false;
}

function Update () {

	StartCoroutine ("hitObjects");

	//On space key, moves towards the object under scope
	if(speedE)
	{
		transform.parent.position = Vector3.MoveTowards (transform.position, go.transform.position - Vector3(0,0,10),  1);//Time.deltaTime);
		if(transform.position == go.transform.position - Vector3(0,0,10)){
			speedE = false;
		}
	}
}

//Uses raycasting to scale the scope
public function hitObjects()
{
	var ray = Ray(transform.position, transform.forward);
	var hit: RaycastHit;

	if (Physics.Raycast (ray, hit, 9999))
	{

		if (hit.rigidbody)
		{
			panel.SetActive(true);
			go = hit.rigidbody.gameObject;
			var txt = go.transform.GetChild(1).gameObject.GetComponent(TextMesh).text;
			scoreDisplay.text = txt;

			if( Input.GetKey ("space")){

				speedE = true;

			}

		}

		// Make scope larger
		scope.transform.localScale.x = 0.04;
		scope.transform.localScale.y = 0.04;
	}
	else
	{
		// Make scope smaller 
		scope.transform.localScale.x = 0.02;
		scope.transform.localScale.y = 0.02;
	}

	//Disables the panel on escape
	if( Input.GetKey (KeyCode.Escape)){

		panel.SetActive(false);

	}
}