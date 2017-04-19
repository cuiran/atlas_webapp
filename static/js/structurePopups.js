
//this pops up when you click on the Weyl group element at the end of the row
function kgbTip1(number){
 var atitle = "Orbit";
 var astring = "This row is orbit " + number + " of K on G/B";
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}

function kgbTip7(string, orbit){
 var atitle = "Weyl group action to orbit " + orbit;
 var astring = "As a product of simple reflections from the minimal length orbit, the twisted involution corresponding to this orbit is " + string; 
 Tip(astring, WIDTH, 300, TITLE, atitle, SHADOW, true, FADEIN, 300, FADEOUT, 300, STICKY, 1, CLOSEBTN, true, CLICKCLOSE, true);
}
