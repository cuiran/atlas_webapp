function getStruc() {
	return $.getJSON('static/json/structure.json');
}
function getGrp(){
	return $.getJSON('static/json/groups.json');
}

var struc;
var grp;
// load json objects into variable struc and populate the topics column
$.when(getStruc()).then(function (data) {
	console.log("json data is ");
	console.log(data);
	struc = data;
	addTopic('#topics');
})
$.when(getGrp()).then(function(data){
	grp = data;
})


// append one button to each topic listed in structure.json
// it also attach a function to the click event
function addTopic(appendTo) {
	$.each(struc, function(i,item) {
		const button = $("<button>").attr({"id":item.id,"type":"button","class":"btn btn-default btn-lg"}).text(item.topic).click(clickCallback(item));
		$(appendTo).append(button);
	})
}

// this is the click callback function
// the inside functions execute whenever the button is clicked
function clickCallback(item) {
    return function() {
		highlightTopicsButton(item.id);
		addToSpecify(item.specify);
		addToLastcol(item.show);
    }
}

// keep topic button highlighted
function highlightTopicsButton(id){
	$.each(struc, function(i,item){
		if (item.id === id){
			console.log(item.id);
			$('#'+item.id).addClass('active');
		} else {
			$('#'+item.id).removeClass('active');
		}
	})
}

// dynamically change the list of buttons in the last column after topic selection
function addToLastcol(list) {
	$('#lastcol').empty();
	$('#lastcol').append("<h4>Show:</h4>");
	$.each(list, function(i, item) {
		const button = $("<button>").attr({"type":"button","class":"btn btn-default btn-md"}).text(item.name).prop('disabled',true);
		$('#lastcol').append(button);
	})
}

// dynamically change the list of specifications in the second column after topic selection
function addToSpecify(list) {
	$('#specify').empty();
	$('#specify').append("<h4>Specify:</h4>");
	var item = list[0];
	const dropdown = $("<select>").attr({
		"id": item,
		"class": "selectpicker",
		"data-width": "85%",
		"title": "choose "+item,
		"method": "POST",
		"onchange": "react(\""+item+"\")"
	});
	$('#specify').append(dropdown).append("<br><br>");
	if ($('#group').length != 0){
		populateGroupDropdown();
	}
	$('.selectpicker').selectpicker('refresh');
}

// get the list of groups in groups.json and use it to populate the "pick a group" dropdown menu
function populateGroupDropdown() {
	console.log(grp);
	$.each(grp, function(i,group){
		$('#group').append($("<option>").attr("value",group.id).text("\$"+group.name+"\$"))})
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"group"]);
	$('.selectpicker').selectpicker('refresh');
}

function react(select_id,structure_item_id) {
	if (select_id == "group"){
		console.log(select_id+" selected");
		groupPickRank()
	} else {
		console.log("not ready")
	}
}

function groupPickRank() {
	if($('#pick_rank').length == 0){
		const pick_rank = $("<select>").attr({
			"id": "pick_rank",
			"class": "selectpicker",
			"data-width": "85%",
			"title": "choose rank",
			"method": "POST",
			"onchange": "postGroupInfo(), groupPickCartan(), changeLastCol()"
			}); 
		$('#specify').append(pick_rank).append("<br><br>");
		for (i=1;i<9;i++){
			$('#pick_rank').append($("<option>").attr("value",i).text("\$n = "+i+"\$"));
		}
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,"pick_rank"]);
		$('.selectpicker').selectpicker('refresh');
	}
}


function postGroupInfo(){
	var rank = document.getElementById("pick_rank").value;
	var group = document.getElementById("group").value;
	console.log(rank,group);
	return ajax_post(rank,group);
}

function ajax_post(rank,group){	
		console.log("posting");
		$.ajax({
			type: 'POST',
			url: '/getCartan',
			contentType: 'json',
			data: JSON.stringify({"rank": rank, "group": group}),
			success: function(){
				console.log('form was submitted \"'+rank+" "+group+'\" end');
			}
		})
}

function groupPickCartan(){
	if($('#pick_Cartan').length == 0){
		console.log("appending pick Cartan dropdown");
		const pick_Cartan = $("<select>").attr({
			"id": "pick_Cartan",
			"class": "selectpicker",
			"data-width": "85%",
			"title": "choose Cartan",
			"method": "POST",
			"onchange": "postCartanInfo()"
		});
		$('#specify').append(pick_Cartan).append("<br><br>");
		
	} else {
		$("#pick_Cartan").empty();

	}
	$('#details').empty();
	$('#details').append("<h4>Available Cartans</h4>");
	var group = document.getElementById("group").value;
	var rank = document.getElementById("pick_rank").value;
	$.getJSON('static/test/Cartans/'+group+'_'+rank+'.json')
		.done(function (data) {
			var Cartan_info = data;
			$('#pick_Cartan').empty();
			$.each(Cartan_info, function(i,item) {
				$('#pick_Cartan').append($("<option>").attr({
						"value": "Cartan_number_"+i
						}).text("Cartan number "+i)
					);
				$('#details').append("<p>"+item.name+"</p>");
				$('#details').append("<p>"+item.info+"</p>");
			})
		$('.selectpicker').selectpicker('refresh');	
		})
	$('.selectpicker').selectpicker('refresh');
}

function changeLastCol() {
	console.log("changeLastCol has argument ");
}


