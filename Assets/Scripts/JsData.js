import UnityEngine.UI;

var theSourceFile : TextAsset;
var Axis : Transform;
//var Line : LineRenderer;
//var marker :Transform;
var xColumn : float;
var yColumn: float;
var zColumn: float;
var labelColumn:float;
var subLabelName : String;

private var xMinMax: Vector2 = Vector2(99999,0);
private var yMinMax: Vector2 = Vector2(99999,0);
private var zMinMax: Vector2 = Vector2(99999,0);

var axesMinMax: Vector2 = Vector2(0,100);
//var RGB: Vector3 = Vector3(0,100);

var RGB : Vector3 = Vector3(16,17,18);
//var IndependentFields : Vector4 = Vector4(1,0,2,3);
var Pistol : Transform;
var RifleShot : Transform;
var AssaultWeapon  : Transform;
var KnifeCut : Transform;
var Default : Transform; 

var Scale : float;
var Rotate : float;
var Fire : float;
var Cold : float;

var Dust : Transform;
var Frost : Transform;

private var rMax : float;
private var gMax : float;
private var bMax : float;
private var rMin : float;
private var gMin : float;
private var bMin : float;
private var sMax : float;
private var sMin : float;
private var fMax : float;
private var cMax : float;
private var fMin : float;
private var cMin : float;
private var rotMin : float;
private var rotMax : float;
private var label : String;
private var label2 : String;
private var Clones : Array = new Array();
private var mySource;
private var axisCanvas : Text;
private var arrested : boolean;
private var toggleColor : boolean;
private var inactiveObj;
private var anaObj;
private var buildObj;
private var quizCount : int;

private var rot : float;
//private var script : MyAnimationScript;

function Start () {

	//Debug.Log("Into values");
	arrested = true;
	toggleColor = true;
	inactiveObj = new Array ();
	anaObj = new Array();
	buildObj = new Array();
	quizCount = 0;

	Axis.position = new Vector3(0,0,0);
	//line.SetPosition(1, hit.point);
	var lineRenderer : LineRenderer = gameObject.AddComponent.<LineRenderer>();
		 //lineRenderer.material = new Material (Shader.Find("Particles/Additive"));
		 //lineRenderer.SetColors(c1, c2);

		 //Drawing Cube
		 var points = new Vector3[16];
		 lineRenderer.SetWidth(0.2,0.2);
		 lineRenderer.SetVertexCount(16);
		 points[0] = Vector3(axesMinMax[0],axesMinMax[0],axesMinMax[0]); points[1] = Vector3(axesMinMax[0],axesMinMax[0],axesMinMax[1]); 
		 points[2] = Vector3(axesMinMax[0],axesMinMax[1],axesMinMax[1]); points[3] = Vector3(axesMinMax[0],axesMinMax[1],axesMinMax[0]); 
		 points[4] = Vector3(axesMinMax[0],axesMinMax[0],axesMinMax[0]); 
		 points[5] = Vector3(axesMinMax[1],axesMinMax[0],axesMinMax[0]); points[6] = Vector3(axesMinMax[1],axesMinMax[0],axesMinMax[1]); 
		 points[7] = Vector3(axesMinMax[1],axesMinMax[1],axesMinMax[1]); points[8] = Vector3(axesMinMax[1],axesMinMax[1],axesMinMax[0]); 
		 points[9] = Vector3(axesMinMax[1],axesMinMax[0],axesMinMax[0]); 
		 points[10] = Vector3(axesMinMax[1],axesMinMax[1],axesMinMax[0]); points[11] = Vector3(axesMinMax[0],axesMinMax[1],axesMinMax[0]); 
		 points[12] = Vector3(axesMinMax[0],axesMinMax[1],axesMinMax[1]); points[13] = Vector3(axesMinMax[1],axesMinMax[1],axesMinMax[1]); 
		 points[14] = Vector3(axesMinMax[1],axesMinMax[0],axesMinMax[1]); points[15] = Vector3(axesMinMax[0],axesMinMax[0],axesMinMax[1]);


		 lineRenderer.SetPositions(points);
		 //lineRenderer.SetPosition(i, pos);



	var myText = theSourceFile.text;
	var myList = myText.Split("#"[0]);
	mySource = myList;
	//Debug.Log(myList);
	rMax = gMax = bMax = sMax = rotMax = fMax = cMax = 0;
	rMin = gMin = bMin = sMin = rotMin = fMin = cMin = 99999;

	axisCanvas = GameObject.Find("Canvas/AxisText").GetComponent(Text);

	var dataList = myList[0].Split("\t"[0]);
	if(dataList.Length >1)
	{
		//Labels for the axiz
		Axis.transform.GetChild(0).gameObject.transform.GetChild(0).gameObject.GetComponent(TextMesh).text = "X : " + dataList[xColumn];
		Axis.transform.GetChild(2).gameObject.transform.GetChild(0).gameObject.GetComponent(TextMesh).text = "Y : " + dataList[yColumn];
		Axis.transform.GetChild(1).gameObject.transform.GetChild(0).gameObject.GetComponent(TextMesh).text = "Z : " + dataList[zColumn];
		var str = "X: " + dataList[xColumn] + "\tY: " + dataList[yColumn] + "\tZ: " + dataList[zColumn];
		axisCanvas.text = str;
	}

	//MinMax for all the possible mappings
	for(var i =1;i<myList.length-3;i ++){

		dataList = myList[i].Split("\t"[0]);
		if(dataList.Length >1){

			label = dataList[labelColumn];
			if(subLabelName!= "NULL" && !label.Contains(subLabelName))
				continue;

		
			if (dataList[RGB[0]]=="") dataList[RGB[0]]="0";
			if (dataList[RGB[1]]=="") dataList[RGB[1]]="0";
			if (dataList[RGB[2]]=="") dataList[RGB[2]]="0";
			var r = parseFloat(dataList[RGB[0]]);
			var g = parseFloat(dataList[RGB[1]]);
			var b = parseFloat(dataList[RGB[2]]);

			//Debug.Log(r + g + b);
			if(rMax<r) 
				rMax = r;
			else if (rMin>r)
				rMin = r;

			if(gMax<g) 
				gMax = g;
			else if (gMin>g)
				gMin = g;

			if(bMax<b) 
				bMax = b;
			else if (bMin>b)
				bMin = b;		


			if (dataList[xColumn]=="") continue;
			var x = parseFloat(dataList[xColumn]);
			if (xMinMax[1] < x)	xMinMax[1] = x;
			if (xMinMax[0] > x)	xMinMax[0] = x;

			if (dataList[yColumn]=="") continue;
			var y = parseFloat(dataList[yColumn]);
			if (yMinMax[1] < y)	yMinMax[1] = y;
			if (yMinMax[0] > y)	yMinMax[0] = y;

			if (dataList[zColumn]=="") continue;
			var z = parseFloat(dataList[zColumn]);
			if (zMinMax[1] < z)	zMinMax[1] = z;
			if (zMinMax[0] > z)	zMinMax[0] = z;


			if(Scale > 0)
			{
				var s;
				if (dataList[Scale]==""){
					s = 2;
				}
				else{
					s = parseFloat(dataList[Scale]);
				}
				if (sMax < s)	sMax = s;
				if (sMin > s)	sMin = s;
			}
			/*
			if(Rotate > 0)
			{
				rot = parseFloat(dataList[Rotate]);
				if (rotMax < rot)	rotMax = rot;
				if (rotMin > rot) rotMin = rot;
			}
			*/
			if(Fire > 0)
			{
				//Debug.Log("In IntiFire");
				if (dataList[Fire]=="") dataList[Fire]="0";
				var f = parseFloat(dataList[Fire]);
				if (fMax < f)	fMax = f;
				if (fMin > f) fMin = f;
			}
			/*
			if(Cold > 0)
			{
				var c = parseFloat(dataList[Cold]);
				if (cMax < c)	cMax = c;
				if (cMin > c) cMin = c;
			}*/
			cMin = 0.0; cMax = 2.0;
		}
	}

	if(xMinMax[0] == xMinMax[1]) xMinMax[1] += 1;
	if(yMinMax[0] == yMinMax[1]) yMinMax[1] += 1;
	if(zMinMax[0] == zMinMax[1]) zMinMax[1] += 1;

	//Data traversal

	for(i =1;i<myList.length-3;i ++){

		dataList = myList[i].Split("\t"[0]);
		if(dataList.Length >1){

			label = dataList[labelColumn];
			if(subLabelName!= "NULL" && !label.Contains(subLabelName))
				continue;

			if(dataList[26] != "")
				label=dataList[26];

			x=y=z=0;

			if (dataList[xColumn]=="") continue;
			x = parseFloat(dataList[xColumn]);
			if (dataList[yColumn]=="") continue;
			y = parseFloat(dataList[yColumn]);
			if (dataList[zColumn]=="") continue;
			z = parseFloat(dataList[zColumn]);


			//Text to be displayed onto canvas
			label2 = "Stop on: " + dataList[3] + "\t Time: " + dataList[4] + "\tin City: " + cityMap(dataList[5]) + "\t Suspected for: " + dataList[29];
			label2 += "\n" + "Features: ";
			label2 += "Age: " + dataList[9] + "\tHeight: " + dataList[10] + "\tWeight: " + dataList[11] + "\tSex: " + dataList[6] + "\tRace: " + raceMap(dataList[7]) + "\tBuild: " + buildMap(dataList[14]);
			label2 += "\n" + "Frisked: " + dataList[16] + "\tSearched: " + dataList[17] + "\tContraband: " + dataList[18];
			label2 += "\t" + "Arrested: " + dataList[25] + "\tfor: " + dataList[26]; 
			label2 += "\n" + "(x,y,z): " + dataList[xColumn] + ", " + dataList[yColumn] + ", " + dataList[zColumn] ;


			var xPct : float = (x -xMinMax[0])/ (xMinMax[1] - xMinMax[0]);
			x = (xPct *(axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];
			var yPct : float = (y -yMinMax[0])/ (yMinMax[1] - yMinMax[0]);
			y = (yPct *(axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];
			var zPct : float = (z -zMinMax[0])/ (zMinMax[1] - zMinMax[0]);
			z = (zPct *(axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];


			var car : float;
			var j : int;

			j = parseInt(dataList[7]);


			//Color and object mapping
			var render: String;
			var color: Color;
			switch(j){
				case 1: render = "Pistol"; color = Color.red; break;
				case 2: render = "RifleShot"; color = Color.green; break;
				case 3: render = "AssaultWeapon"; color = Color.yellow; break;
				case 4: render = "KnifeCut"; color = Color.blue; break;
				default : render = "Default"; color = Color.white; break;
			}

			//Debug.Log("i " + i);
			var newVar : Transform = this.GetType().GetField(render).GetValue(this);
			var myMarker : Transform = Instantiate(newVar, Vector3(x,y,z),Quaternion.identity);
			myMarker.name = "Clone" + i;

			Clones.push(myMarker);

			r = parseFloat(dataList[RGB[0]]);
			g  = parseFloat(dataList[RGB[1]]);
			b = parseFloat(dataList[RGB[2]]);

			r = (r-rMin)/(rMax-rMin);
			g = (g-gMin)/(gMax-gMin);
			b = (b-bMin)/(bMax-bMin);
			color = Color(r,g,b);
			//var alpha = 0;


			if (dataList[25]=="1"){
				myMarker.transform.GetChild(0).gameObject.GetComponent(TextMesh).color =Color(0,0,1);
			}

			myMarker.GetComponent.<Renderer>().material.color = color;
			myMarker.transform.GetChild(0).gameObject.GetComponent(TextMesh).text = label;
			myMarker.transform.GetChild(1).gameObject.GetComponent(TextMesh).text = label2;

			
			if(Scale > 0)
			{
				if (dataList[Scale]==""){
					dataList[Scale] = "2";
				}
				s = parseFloat(dataList[Scale]);
				s = (s-sMin)/(sMax - sMin);
				s = (1-s)*2;
				s += 1;
				myMarker.localScale = new Vector3(s,s,s);
			}
			/*
			if(Rotate > 0)
			{
				rot = parseFloat(dataList[Rotate]);
				rot = (rot - rotMin )*10/(rotMax - rotMin);
				//Debug.Log("rotateJS " + rot);

				myMarker.GetComponent(RotateScript).rotateUpdate(rot);
			}*/

			//Instantiating fire and frost. Not used in the current scene due to its impact on rendering speed.
			/*
			if(Fire > 0)
			{
				//Debug.Log("In Fire");
				var part : Transform =  Instantiate(Dust, Vector3(x,y,z),Quaternion.identity);
				part.Rotate(Vector3(-90,0,0));
				part.Translate(Vector3(0,0,1));
				if (dataList[Fire]=="") dataList[Fire]="0";
				f = parseFloat(dataList[Fire]);
				f = (f-fMin)/(fMax - fMin);
				//if(f==0) Debug.Log("In Fire" + label);

				part.localScale = new Vector3(f,f,f);
				//Debug.Log("Fire scale " + f);
				//part.GetComponent.<Renderer>().material.color = Color(0,0,1);
			}

			if(Cold > 0)
			{
				var cold : Transform =  Instantiate(Frost, Vector3(x,y,z),Quaternion.identity);
				cold.Rotate(Vector3(90,0,0));
				cold.Translate(Vector3(0,0,0.5));
				var c : float = 0;
				
				for (var coldS =0; coldS<7; coldS++){
					if (dataList[Cold+coldS]!=""){
						c += parseFloat(dataList[Cold+coldS]);
					}
				}
				//c = parseFloat(dataList[Cold]);

				c = (c-cMin)/(cMax - cMin);
				if (c>0) Debug.Log("c + " +  c);
				cold.localScale = new Vector3(c,c,c);
			}
			*/

			//Anomalies for QA
			if (dataList[9]=="") continue;
			var age = parseFloat(dataList[9]);
			if(age > 150 || age <2) anaObj.push(myMarker);

			if (dataList[14]=="") continue;
			var build = parseFloat(dataList[14]);
			if(build < 2) buildObj.push(myMarker);
		}
	}

}

function Update () {

	//Used to toggle full data v/s arrested data
	if(Input.GetButton("Fire2")){
		Fire2();
	}

	//Used to toggle colors based on race vs <Frisked, Searched, Contraband>
	if(Input.GetButton("Fire3")){

		Fire3();
	}

	//Map x coordinate
	if( Input.GetKey ("y")){

		var arrestToggle = false;
		if(!arrested) {	Fire2(); arrestToggle = true;}

		if(xColumn == 5)	xColumn = 83;
		else if(xColumn == 7)	xColumn = 5;
		else xColumn = 7;

		minMax(xColumn, yColumn, zColumn);
		readxyz(xColumn, yColumn, zColumn);

		if(arrestToggle) {	Fire2(); arrestToggle = false;}
	}

	//Map y coordinate
	else if( Input.GetKey ("u")){

		arrestToggle = false;
		if(!arrested) {	Fire2(); arrestToggle = true;}

		if(yColumn == 10)	yColumn = 5;
		else yColumn = 10;
		minMax(xColumn, yColumn, zColumn);
		readxyz(xColumn, yColumn, zColumn);

		if(arrestToggle) {	Fire2(); arrestToggle = false;}
	}

	//Map z coordinate
	else if( Input.GetKey ("i")){

		arrestToggle = false;
		if(!arrested) {	Fire2(); arrestToggle = true;}

		if(zColumn == 9)	zColumn = 75;//zColumn = 30;
		else	zColumn = 9;
		minMax(xColumn, yColumn, zColumn);
		readxyz(xColumn, yColumn, zColumn);

		if(arrestToggle) {	Fire2(); arrestToggle = false;}
	}

	//Guided tour
	else if( Input.GetKeyDown ("return")){

		quizCount++;

		switch(quizCount){

			case 1:
				for(var g in anaObj)
					g.transform.GetChild(2).gameObject.SetActive(true);
				break;

			case 2:
				for(var g in anaObj)
					g.transform.GetChild(2).gameObject.SetActive(false);
				break;

			case 3:
				if(!toggleColor){
					Debug.Log("into toggle" + toggleColor);
					Fire3();
				}
				break;
			case 5: 
				if(toggleColor)
					Fire3();
				break;
			case 7: 
				if(!toggleColor)
					Fire3();
				if(!arrested)
					Fire2();
				break;

			case 9:
				for(var g in buildObj)
					g.transform.GetChild(2).gameObject.SetActive(true);
				break;

			case 10:
				for(var g in buildObj)
					g.transform.GetChild(2).gameObject.SetActive(false);
				break;

			default: break;
		}

	}

}

//Used for debugging purpose
function printArray(a){
	s = "";
	for (i=0; i<a.length; i++){
		s = s+a[i] + "\t";
		Debug.Log(a[i]);
	}
	return s;
}

//Used to toggle full data v/s arrested data
function Fire2(){

		if(arrested){
			inactiveObj.Clear();
			arrested = false;
			for(var g in GameObject.FindGameObjectsWithTag("Models")){

	    		var col = g.transform.GetChild(0).gameObject.GetComponent(TextMesh).color;

	    		if(col != Color.blue){
	            	g.SetActive(false);	
	            	inactiveObj.push(g);
	            }
	   		}

		}
		else{
			arrested = true;
			for(var g in inactiveObj){
				g.SetActive(true);
//				Fire3();
//				Fire3();
			}		
		}
}

//Used to toggle colors based on race vs <Frisked, Searched, Contraband>
function Fire3(){

	if(arrested){
		mapColor();
		if(toggleColor) toggleColor = false; else toggleColor = true;
	}
}

//Calculate min and max for given axis
function minMax(xx : int, yy:int,zz:int){

	xMinMax = Vector2(9999999,0);
	yMinMax = Vector2(9999999,0);
	zMinMax = Vector2(9999999,0);

	for(var i =1;i<mySource.length-3;i ++){

		var dataList = mySource[i].Split("\t"[0]);

		if (dataList[xx]=="") dataList[xx]="0";
		var x :float = parseFloat(dataList[xx]);
		if (xMinMax[1] < x)	xMinMax[1] = x;
		if (xMinMax[0] > x)	xMinMax[0] = x;

		if (dataList[yy]=="") dataList[yy]="0";
		var y = parseFloat(dataList[yy]);
		if (yMinMax[1] < y)	yMinMax[1] = y;
		if (yMinMax[0] > y)	yMinMax[0] = y;

		if (dataList[zz]=="") dataList[zz]="0";
		var z = parseFloat(dataList[zz]);
		if (zMinMax[1] < z)	zMinMax[1] = z;
		if (zMinMax[0] > z)	zMinMax[0] = z;

	}
}

//Translates the objects onto the new coordinate system
function readxyz(xx : int, yy:int,zz:int){

	var dataList = mySource[0].Split("\t"[0]);
	var s = "Clone";

	Axis.transform.GetChild(0).gameObject.transform.GetChild(0).gameObject.GetComponent(TextMesh).text = "X : " + dataList[xx];
	Axis.transform.GetChild(2).gameObject.transform.GetChild(0).gameObject.GetComponent(TextMesh).text = "Y : " + dataList[yy];
	Axis.transform.GetChild(1).gameObject.transform.GetChild(0).gameObject.GetComponent(TextMesh).text = "Z : " + dataList[zz];
	var str1 = "X: " + dataList[xx] + "\tY: " + dataList[yy] + "\tZ: " + dataList[zz];
	axisCanvas.text = str1;

	for(var i=1; i<mySource.length-3; i++){

		var str = s + i;
		var go :GameObject = GameObject.Find(str);
		if(go==null)	continue;

		var pos = go.transform.position;
		pos = -pos;

		dataList = mySource[i].Split("\t"[0]);
		if(dataList.Length >1){

			x=y=z=0;

			if (dataList[xx]=="") dataList[xx]="0";
			x = parseFloat(dataList[xx]);
			if (dataList[yy]=="") dataList[yy]="0";
			y = parseFloat(dataList[yy]);
			if (dataList[zz]=="") dataList[zz]="0";
			z = parseFloat(dataList[zz]);

			var xPct : float = (x -xMinMax[0])/ (xMinMax[1] - xMinMax[0]);
			x = (xPct *(axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];
			var yPct : float = (y -yMinMax[0])/ (yMinMax[1] - yMinMax[0]);
			y = (yPct *(axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];
			var zPct : float = (z -zMinMax[0])/ (zMinMax[1] - zMinMax[0]);
			z = (zPct *(axesMinMax[1] - axesMinMax[0])) + axesMinMax[0];

			pos += Vector3(x,y,z);
			go.transform.Translate(pos,Space.World);	

		}	
	}
}

//Toggles color by tranversing through the objects
function mapColor(){

	var dataList;
	var s = "Clone";
	var color: Color;

	for(var i=1; i<mySource.length-3; i++){

		dataList = mySource[i].Split("\t"[0]);
		var str = s + i;
		var go :GameObject = GameObject.Find(str);
		if(go==null)	continue;

		if(toggleColor)
		{

			var j : int;

			if (dataList[7]=="") dataList[7]="0";
			j = parseInt(dataList[7]);


			switch(j){
				case 1: color = Color.red; break;
				case 2: color = Color.green; break;
				case 3: color = Color.yellow; break;
				case 4: color = Color.blue; break;
				default : color = Color.white; break;
			}
		}

		else{

			var q = parseInt(RGB[0]);
			var w = parseInt(RGB[1]);
			var e = parseInt(RGB[2]);

			r = parseFloat(dataList[q]);
			g  = parseFloat(dataList[w]);
			b = parseFloat(dataList[e]);

			r = (r-rMin)/(rMax-rMin);
			g = (g-gMin)/(gMax-gMin);
			b = (b-bMin)/(bMax-bMin);
			color = Color(r,g,b);
		
		}

		go.GetComponent.<Renderer>().material.color = color;

	}
}

//Returns the city 
function cityMap(c: String) {
	switch(c){
		case "1" : return "Manhattan"; break;
		case "2" : return "Brooklyn"; break;
		case "3" : return "Bronx"; break;
		case "4" : return "Queens"; break;
		case "5" : return "Staten Island"; break;
		default : return "";
	}
}

//Returns the race
function raceMap(c: String) {
	switch(c){
		case "1" : return "Black"; break;
		case "2" : return "Black Hispanic"; break;
		case "3" : return "White Hispanic"; break;
		case "4" : return "White"; break;
		case "5" : return "Asian/Pacific Islander"; break;
		case "6" : return "Native American"; break;
		default : return "";
	}
}

//Returns build of the person 
function buildMap(c: String) {
	switch(c){
		case "1" : return "Heavy"; break;
		case "2" : return "Muscular"; break;
		case "3" : return "Medium"; break;
		case "4" : return "Thin"; break;
		default : return "";
	}
}

function formatTime(c: String){
	l = c.length;
	if (l<3){
		return c+":00";
	}
	if (l==3){
		return c.Substring(0,1)+":"+c.Substring(1, l-1);
	}
	else{
		return c.Substring(0,2)+":"+c.Substring(2, l-1);
	}
}

function formatDate(c: String){
	l = c.length;
	if (l<=7){
		Debug.Log("string<=7 "+ c);
		Debug.Log("length " + l );
		var s =  c.Substring(0,1)+"-"+c.Substring(1, 3)+"-"+c.Substring(3,l-2);
		return s;
	} 
	else{
		Debug.Log("string>7 "+ c);
		return c.Substring(0,2)+"-"+c.Substring(2, 4)+"-"+c.Substring(4,l-1);
	}
}