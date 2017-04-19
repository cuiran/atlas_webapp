//------------
//POPUPS FOR COMMAND CARTAN
//------------

//This tip comes up for the Title(i.e. Cartan #0:)
function cartanTip1(cartan) {
  var atitle = "Cartan #" + cartan;
  var astring = "The Cartans are labeled from most compact to most split";
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}


//This tip pops up for the Lie Group Structure(i.e. split: 0;compact: 5; complex: 0
function cartanTip2(cartan, structure) {
  var atitle = "Lie group structure of Cartan #" + cartan;
  var astring = "As a real group, this Cartan subgroup is isomorphic to " + structure;
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}


//This tip pops up for the canonical twisted involution
//
function cartanTip3(cartan, compact) {
  var atitle = "Twisted Involution on Cartan #" + cartan;
  var astring;
  if(compact) {
    astring = "The conjugacy classes of Cartan subgroups are in natural bijection with conjugacy classes of twisted involutions. Since this is the most compact Cartan, the twisted involution class consists of the identity element alone.";
  } else {
    astring = "The conjugacy classes of Cartan subgroups are in natural bijection with conjugacy classes of twisted involutions. This line gives a canonical twisted involution in the conjugacy class corresponding to this Cartan subgroup (written as a product of simple reflections).";
  }
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//This tip pops up for Twisted Involution Orbit Size
function cartanTip4(cartan, tios){
 var atitle = "Twisted Involution Orbit Size for Cartan#" + cartan;
 var astring = "The number of elements in the conjugacy class of twisted involutions for Cartan #" + cartan + " is " + tios + ".";
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true); 
}

//This tip pops up for the fiber rank
function cartanTip5(number, rank) {
  var atitle = "Fiber rank for Cartan#" + number;
  var astring = "'The fiber of the natural map from the reduced parameter space to the set of twisted involution classes over the class corresponding to Cartan #" + number + " is an elementary 2-group of rank" + rank;
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//this tip pops up for x_r
function cartanTip6(cartan, x_r){
 var atitle = "X_r size for Cartan#" + cartan;
 var astring = "The number of strong involutions that lie of the conjugacy class of Cartan #" + cartan + " is " + x_r;
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//This tip pops up for Root Systems
function cartanTip7(number, imagSystem, realSystem, systemType) {
  var atitle = "Root Systems";
  var astring;
  switch(systemType) {
  case 0:
    astring = "There are no imaginary roots associated to this Cartan subgroup #" + number + "; the real roots form a root system of type "+realSystem+". (A root is called real if the twisted involution negates it, imaginary if the twisted involution fixes it, and complex otherwise.)";	
    break;
  case 1:
    astring = "There are no real roots associated to Cartan subgroup #"+number+"; the imaginary roots form a root system of type "+imagSystem+". (A root is called real if the twisted involution negates it, imaginary if the twisted involution fixes it, and complex otherwise.)"; 
    break;
  case 2:
    astring = "The imaginary and real roots associated to Cartan subgroup #"+number+" form root systems of type "+imagSystem+" and "+realSystem+", respectively. (A root is called real if the twisted involution negates it, imaginary if the twisted involution fixes it, and complex otherwise.)";
    break;
  }
  
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//This tip pop ups for the complex factor
function cartanTip8(number) {
  var atitle = "Complex Factor for Cartan #"+ number;
  var astring = "The complex factor is a root system constructed from the complex roots. For a precise definition, see Vogan, Proposition 3.12, p. 959 in Duke Math J. 49:4 (1982). (A complex root is one neither fixed nor negated by a given twisted involution).";
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}


//This tip pops up for each real form
//ex: onclick="cartanTip9(3, 1, ['so(6,4)', 'so(8,2)'], 1, '[3]')"
//this should be the input from realform#1 in cartan#3, for SO(10), compact, with orbit [3], and orbitsize 1.
function cartanTip9(number, realFormNum, allRealForms, relevantRealForms, orbitSize, paramSpace) {
  var atitle = "Real Form#"+realFormNum+" containing Cartan #" + number;
  var astring = "Cartan subgroup #"+number+" is contained in each of the following real forms:<br>";
  for(i=0;i<relevantRealForms.length;i++) {
    astring+=relevantRealForms[i]+"<br>";
  }
  astring += "There is a bijection between these real forms and the orbits of the action of the Weyl group of the imaginary root system on the fiber of the reduced parameter space X<sup>r</sup> over the canonical twisted involution. For real form #"+realFormNum+", which is "+allRealForms[realFormNum]+", the corresponding orbit has size "+orbitSize+" and consists of those elements of the reduced parameter space labeled"+paramSpace;
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}


//--------------
//POPUPS FOR COMPONENTS COMMAND
//--------------

function componentsTip1() {
  var atitle = "Components of Real Group";
  var astring = "This command describes the structure of the real group mod its identity component."
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//--------------
//POPUPS FOR STRONGREAL COMMAND
//--------------

//this pops up ONLY IN THOSE FILES WITH MULTIPLE REAL FORM CLASSES when you click the class number itself
function strongrealTip1(myClass){
 var atitle = "Real form class#" + myClass;
 var astring = "There are multiple possible values for the square class in Z<sup>&delta;</sup>/(1+&delta;)Z. The following lines correspond to class #" + myClass + ".";
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//this pops up in either file, but myClass is set to -1 if there's a unique real form class, and that's what causes the different texts
//EVENTUALLY, THIS FUNCTION SHOULD CONVERT REAL FORM INDICES TO REAL FORM NAMES SOMEHOW.
function strongrealTip2(myClass, realFormIndex, involutionArray, numEquivStrongInvs){
 var atitle = "strongrealTip2 needs title";
 
 //to get around writing two functions, we are saying myClass is "-1" to mean that there's a unique class.
 if(myClass == -1){
  var astring = "strongrealTip2 needs a text. It knows there's only one real form class and it knows the following data:" + realFormIndex + " " + involutionArray+ " " + numEquivStrongInvs; 
 }else{
  var astring = "strongrealTip2 needs a text. It knows that this is real form class " + myClass + " and it knows the following data:" + realFormIndex + " " + involutionArray + " " + numEquivStrongInvs;
 }
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//------------------
//POPUPS FOR KGB COMMAND
//------------------

//this pops up in the leftmost column (orbit number)
function kgbTip1(number){
 var atitle = "Orbit";
 var astring = "This row is orbit " + number + " of K on G/B";
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//this pops up in the next column (length)
function kgbTip2(number, orbit){
 var atitle = "Length of orbit " + orbit;
 var astring = "The length of this orbit is " + number;
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//this pops up in the next column (cartan)
function kgbTip3(number, orbit){
 var atitle = "Cartan of orbit " + orbit;
 var astring = "This orbit corresponds to Cartan #" + number;
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//this pops up when you click on the array [c, C, n, r] of roots
function kgbTip4(rootTotal, orbit, rootTypeArray){
 var atitle = "Simple Root Types for orbit " + orbit;
 var astring = "<table><tr><td><u>Simple Root</u></td><td><u>Type</u></td></tr>";
 var i = 1;
 for(i = 1; i <= rootTotal; i++){
	 var rootType = rootTypeArray[i-1];
	 astring = astring + "<tr><td>#" + i + ":</td><td>" + rootType + "</td></tr>";
 }
 astring = astring + "</table>";
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//this pops up when you click on a cross-action
function kgbTip5(rootIndex, orbit, destination){
 var atitle = "Cross Actions on orbit " + orbit;
 if(orbit != destination){
  var astring = "The cross action of simple root " + rootIndex + " takes orbit " + orbit + " to orbit <a href = #" + destination + ">" + destination + ".</a>";
 }
 else{
  var astring = "The cross action of simple root " + rootIndex + " fixes orbit " + orbit +".";	 
 }
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//this pops up when you click on a Cayley transform
//we are sending the scalar -1 for destination in the event that it's "*"
function kgbTip6(rootIndex, orbit, destination){
 var atitle = "Cayley Transforms on orbit " + orbit;
 if (destination == -1){
  var astring = "There is no Cayley transform by simple root " + rootIndex + " (root type must be noncompact imaginary).";
 }else if(orbit != destination){
  var astring = "The Cayley transform by simple root " + rootIndex + " takes orbit " + orbit + " to orbit <a href = #" + destination + ">" + destination + ".</a>";
 }else{
  var astring = "The Cayley transform by simple root " + rootIndex + "fixes orbit" + orbit +".";	   
 }
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//this pops up when you click on the Weyl group element at the end of the row
function kgbTip7(string, orbit){
 var atitle = "Weyl group action to orbit " + orbit;
 var astring = "As a product of simple reflections from the minimal length orbit, the twisted involution corresponding to this orbit is " + string; 
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//--------------------------------
//POPUPS FOR BLOCKSIZES COMMAND
//-------------------------------
function blocksizesTip1(data, i, j, realForm, dualRealForm){
 var atitle = "Block " + i + "," + j;
 var astring = "The block associated to real form " + realForm + " and dual real form " + dualRealForm + " contains ";
 if (data == 0){
  astring = astring + "no representations.";	
 }else if (data == 1){
  astring = astring + "a unique representation.";
 }else{
  astring = astring + data + " representations.";
 }
Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);	
}
