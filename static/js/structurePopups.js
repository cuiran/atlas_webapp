// Cartan popups

//Tip for cartan table/orbit column
function cartanTipOrbit(orbit_size) {
    var atitle = "Orbit of twisted involution ";
    var astring = "The conjugacy class of the twisted involution is of size " + orbit_size;
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//Tip for cartan table/fiber column
function cartanTipFiber(fiber) {
    var atitle = "Fiber of map to twisted involution";
    var astring = "The fiber of the map to the twisted involution has size " + fiber;
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//Tip for cartan table/strong involution column
function cartanTipStrongInvolution(strong_inv) {
    var atitle = "Strong involutions with same square";
    var astring = "Number of strong involution y satisfying y<sup>2</sup>=x<sup>x</sup>: " + strong_inv;
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}



//This tip comes up for the Title(i.e. Cartan #0:)
function cartanTip1(cartan) {
  var atitle = "Cartan #" + cartan;
  var astring = "The Cartans are labeled from most compact to most split";
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//This tip pops up for the S^1 factors of the Cartan
function cartanTipCompact(cartan, dimension) {
    var atitle = "Lie group structure of Cartan #" + cartan;
    var astring = "Cartan #" + cartan + " has " + dimension + " S<sup>1</sup> factors";
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//This tip pops up for the R^x factors of the Cartan
function cartanTipSplit(cartan, dimension) {
    var atitle = "Lie group structure of Cartan #" + cartan;
    var astring = "Cartan #" + cartan + " has " + dimension + " R<sup>x</sup> factors";
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//This tip pops up for the C^x factors of the Cartan
function cartanTipComplex(cartan, dimension) {
    var atitle = "Lie group structure of Cartan #" + cartan;
    var astring = "Cartan #" + cartan + " has " + dimension + " C<sup>x</sup> factors";
  Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//This tip pops up for the canonical twisted involution in the Cartan tables
function cartanTip3(cartan, involution) {
  var atitle = "Twisted Involution on Cartan #" + cartan;
    var astring="The conjugacy classes of Cartan subgroups are in  bijection with conjugacy classes of twisted involutions.<P>This is the canonical twisted involution in the conjugacy class for Cartan #" + cartan + " written as a product of simple reflections times the distinguished involution &delta;";
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

function cartanTipRootsIm(cartan, system){
    var atitle = "System of Imaginary Roots for Cartan #" + cartan;
    var astring;
    if (system == "empty" ) {astring="Cartan #" + cartan + " has no imaginary roots";}else
    {astring="The imaginary roots of Cartan #" + cartan + " are of type " + system;}
    Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

function cartanTipRootsReal(cartan, system){
    var atitle = "System of Real Roots for Cartan #" + cartan;
    var astring;
    if (system == "empty" ) {astring="Cartan #" + cartan + " has no real roots";}else
    {astring="The real roots of Cartan #" + cartan + " are of type " + system;}
    Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

function cartanTipRootsComplex(cartan, system){
    var atitle = "Root system   &Delta;<sup>C</sup> for Cartan #" + cartan;
    var astring;
    if (system == "empty" ) {astring="The root system &Delta;<sup>C</sup> of Cartan #" + cartan + " is empty";}else
    {astring="The root system R<sup>C</sup> of Cartan #" + cartan + " is of type " + system;}
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


//kgb popups

//this pops up when you click on the Weyl group element at the end of the row
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

function kgbTip7(string, orbit){
 var atitle = "Weyl group action for orbit " + orbit;
 var astring = "As a product of simple reflections from the minimal length orbit, the twisted involution corresponding to this orbit is " + string; 
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

//this pops up in the next column (cartan)
function kgbTip3(number, orbit){
 var atitle = "Cartan of orbit " + orbit;
 var astring = "This orbit corresponds to Cartan #" + number;
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

//this pops up the canonical tip
function kgbTipsharp(number, canonical, cartan,involution){
    if (canonical == 1){
	var astring = "KGB element " + number + " is associated to the canonical involution " + involution + " for Cartan number " + cartan;}
var atitle = "Canonical involution";
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

