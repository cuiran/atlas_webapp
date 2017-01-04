//function show(targets){
//    for (i = 0; i < targets.length; i++) { 
 //       document.getElementById(targets[i]).style.display = 'block';
  //  }
//};

// load structure.json file and add topics to the main page
$.getJSON('static/json/structure.json')
	.done(function (data) {
		var structure = data;
		console.log(structure);
		addTopic('#topics',structure);
})

// this function append one button to each topic listed in structure.json
// it also attach a function to the click event
function addTopic(appendTo, structure) {
	$.each(structure, function(i,item) {
		const button = $("<button>").attr({"id":item.id,"type":"button","class":"btn btn-default btn-lg"}).text(item.topic).click(clickCallback(item));
		$(appendTo).append(button);
	})
}

// this is the click callback function
// the inside functions execute whenever the button is clicked
function clickCallback(item) {
    return function() {
        addToLastcol(item.show);
		addToSpecify(item.specify);
		populateGroupDropdown();
//		displayDetails(item.specify);
    }
}

// this function dynamically change the list of buttons on the last column of the page
function addToLastcol(list) {
	$('#lastcol').empty();
	$('#lastcol').append("<h4>Show:</h4>");
	$.each(list, function(i, item) {
		const button = $("<button>").attr({"type":"button","class":"btn btn-default btn-md"}).text(item.name)
		$('#lastcol').append(button);
	})
}

// this function dynamically change the list of specifications on the second column of the page
function addToSpecify(list) {
	$('#specify').empty();
	$('#specify').append("<h4>Specify:</h4>");
	$.each(list.slice(0,1), function(i,item) {
		const dropdown = $("<select>").attr({
			"id":item, 
			"class":"selectpicker", 
			"data-width":"85%", 
			"title":"pick a "+item, 
			"method":"POST", 
			"onchange":"react(\""+item+"\")"});
		$('#specify').append(dropdown).append("<br><br>");
	})
	$('.selectpicker').selectpicker('refresh');
}

// get the list of groups in groups.json and use it to populate the "pick a group" dropdown menu
function populateGroupDropdown() {
	$.getJSON('static/json/groups.json')
		.done(function (data) {
			var group_list = data;
			$.each(group_list, function(i,group) {
				$('#group').append($("<option>").attr("value",group.id).text("\$"+group.name+"\$"))});
			$('.selectpicker').selectpicker('refresh');
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	});
}

function react(select_id) {
	if (select_id == "group"){
		console.log(select_id+" selected");
		return groupPickRank();
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
			"title": "choose n",
			"method": "POST",
			"onchange": "postGroupInfo(), groupPickCartan()"
			}); 
		$('#specify').append(pick_rank).append("<br><br>");
		for (i=1;i<9;i++){
			$('#pick_rank').append($("<option>").attr("value",i).text("\$n = \$"+i));
		}
		$('.selectpicker').selectpicker('refresh');
		MathJax.Hub.Typeset();
	}
}


function postGroupInfo(){
	var rank = document.getElementById("pick_rank").value;
	var group = document.getElementById("group").value;
	console.log(rank,group);
	return ajax_post(rank,group);
}

function post_data(id){
	return function(){
		ajax_post();
	}
};

function ajax_post(rank,group){	
		console.log("posting");
		$.ajax({
			type: 'POST',
			url: '/getCartan',
			contentType: 'json',
			data: JSON.stringify({"rank": rank, "group": group}),
			success: function(){
				alert('form was submitted \"'+rank+" "+group+'\" end');
			}
		})
}

function groupPickCartan(){
	console.log("pick Cartan not ready")
}


//function displayDetails(specify) {
//	console.log(specify);
//	$.each(specify, function(i,item) {
//		if (item == "Cartan") {
//			$('#details').empty();
//			var element = document.getElementById("group");
//			var group_selected = element.options[element.selectedIndex].text;
//			$('#details').append("<h4>Available Cartans:</h4>");
//		}
//	})
//}


