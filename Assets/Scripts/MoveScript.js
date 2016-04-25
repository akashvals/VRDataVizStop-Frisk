#pragma strict

private var toggleMove : boolean;
private var nextMove : boolean;
private var move : int;
private var quizCount : int;
private var clearAll : boolean;
var Gear : Text;
var Question : Text;
private var t : float;

function Start () {

	toggleMove = false;
	quizCount = 0;
	clearAll = false;
	move = 0;
}

function Update () {

	var d = Input.GetAxis("Mouse ScrollWheel");

	//Gets mouse wheel magnitude
 	if (d > 0f)
 	{
 		// scroll up
 		move += d*10;
 		Gear.text = "Gear: " + move;
 	}
 	else if (d < 0f)
 	{
 		// scroll down
 		move += d*10;
 		Gear.text = "Gear: " + move;
 	}

 	//moves with mouse wheel magnitude
	if(Input.GetButton("Fire1")){

		transform.position = transform.position + Camera.main.transform.forward * move * 10 * Time.deltaTime;
	}

	//Guided tour
	if( Input.GetKeyDown ("return")){

		quizCount++;
		nextMove = true; 

	}

	//Tour Steps
	if(nextMove){

		switch(quizCount){

			case 1: moveCamera(Vector3(100,90,90), Vector3(-1,0,0)); break;
			case 2: Question.text = "Q2"; break;
			case 3: moveCamera(Vector3(50,50,-50), Vector3(0,0,1));  break;
			case 4: Question.text = "Q3"; break;
			case 5: moveCamera(Vector3(50,50,-50), Vector3(0,-1,1));  break;
			case 6: Question.text = "Q4"; break;
			case 7: moveCamera(Vector3(-50,50,0), Vector3(1,0,1));  break;
			case 8: Question.text = "Q5"; break;
			case 9: moveCamera(Vector3(100,90,90), Vector3(-1,0,0));  break;
			//case 10: Question.text = "Q4"; break;
			default: Question.text = "FREE EXPLORE"; break;
		}
	}
}

//Move the camera to appropriate location and orients as per the direction vector
function moveCamera(v:Vector3, dir:Vector3 ){

	transform.position = Vector3.MoveTowards (transform.position, v,  1);//Time.deltaTime);
		if(transform.position == v){
			nextMove = false;
			transform.forward = dir;
		}
}