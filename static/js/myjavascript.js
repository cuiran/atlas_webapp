function getStruc() {
	return $.getJSON('static/json/structure.json');
}
function getGrp(){
	return $.getJSON('static/json/groups.json');
}

var struc;
var grp;
// load json objects into variable struc and populate the topics column
$($.when(getStruc()).then(function (data) {
	console.log("json data is ");
	console.log(data);
	struc = data;
	addTopic('#topics');
}))
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
		$('#details').empty();
    }
}

// keep topic button highlighted
function highlightTopicsButton(id){
	$.each(struc, function(i,item){
		if (item.id === id){
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
	const div = $("<div>").attr({
		"id": item+"_div",
		"class": "form-group"
	})
	const dropdown = $("<select>").attr({
		"id": item,
		"class": "selectpicker",
		"data-width": "85%",
		"data-windowPadding": "[5px,25px,5px,5px]",
		"title": "choose "+item,
		"method": "POST",
		"onchange": "changeSpecify(\""+item+"\")"
	});
	$('#specify').append(div);
	$('#'+item+'_div').append(dropdown);
	if ($('#group').length != 0){
		populateGroupDropdown();
	}
	$('.selectpicker').selectpicker('refresh');
}

// get the list of groups in groups.json and use it to populate the "pick a group" dropdown menu
function populateGroupDropdown() {
	$.each(grp, function(i,group){
		$('#group').append($("<option>").attr("value",group.id).text("\$"+group.name+"\$"))})
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"group"]);
	$('.selectpicker').selectpicker('refresh');
}

function changeSpecify(item_changed){
	topics_div = document.getElementById("topics")
	active_button = topics_div.getElementsByClassName("active")[0];
	active_button_id = active_button.id;
	selected_topic = $.grep(struc, function(e){return e.id === active_button_id})[0];
	specs = selected_topic.specify
	index_changed = specs.indexOf(item_changed)
	var next_spec;
	if (specs.length == index_changed + 1){
		next_spec = "EndOfSpecs"
	} else{
		next_spec = specs[index_changed+1]
	}
	val_dict ={};
	for (i=0; i<=index_changed; i++) {
		val_dict[specs[i]] = document.getElementById(specs[i]).value; 
	}
	func_dict = {"rank": addRank, "Cartan": addCartan}
	removeOutdate(item_changed,index_changed,specs)
	func_dict[next_spec](val_dict)
}

function removeOutdate(item_changed,index_changed,specs){
	for (i=index_changed+1; i<specs.length; i++) {
		if ($('#'+specs[i]+'_div').length != 0){
			console.log(specs[i]+" not empty, removing ");
			$("#"+specs[i]+"_div").remove();
		}
	}
	$('#details').empty();
}

function addRank(val_dict){
	group_selected = val_dict["group"]
	grp_item = $.grep(grp, function(g){return g.id === group_selected})[0]
	input_needed = grp_item.need_rank
	if (input_needed.length === 1) {
		const div = $("<div>").attr({
			"id": "rank_div",
			"class": "form-group"
		})
		const choose_rank = $("<select>").attr({
			"id": "rank",
			"class": "selectpicker",
			"data-width": "85%",
			"title" : "choose rank",
			"method": "POST",
			"onchange": "changeSpecify(\"rank\")"
		});
		$('#specify').append(div);
		$('#rank_div').append(choose_rank);
		for (i=1; i<9; i++){
			$('#rank').append($("<option>").attr("value", i).text("\$n="+i+"\$"));
		}
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,"rank"]);
		$('.selectpicker').selectpicker('refresh');
	} else {
		console.log("not ready yet");
	}	
}

function addCartan(val_dict){
	val_dict["request"]="Cartan"
	$.ajax({
		type: 'POST',
		url: '/newquery',
		contentType: 'json',
		data: JSON.stringify(val_dict),
		success: function(){
			console.log("group and rank information posted");
		},
		complete: function(output){
			query_id = JSON.parse(output.responseText).query_id;
			ajax_get(query_id);
		}
	})
}


function timeOutCallBack(query_id){
	return function() {
		ajax_get(query_id);
	}
}

function ajax_get(query_id){
	$.ajax({
		type: 'POST',
		url: '/checkquery',
		contentType: 'json',
		data: JSON.stringify({"query_id":query_id}),
		success: function(){
			console.log("query id posted")
		},
		complete: function(output){
			out= JSON.parse(output.responseText) 
			out_stat = out.status
			if (out_stat === "SUCCESS") {
				addCartanOptions(out.output)
				addAvailCartans(out.output)
			} else if (out_stat === "FAILED") {
				console.log("failed")
				console.log(out)
			} else {
				setTimeout(timeOutCallBack(query_id),500)
			}
		}
	})
}

function addAvailCartans(output){
	$('#details').empty();
	$('#details').append("<h4>Available Cartans</h4>")
	text_list = output.split("\n")
	for (i=3; i<text_list.length-1; i++){
		$('#details').append($("<p>").text(text_list[i]))
	}
}

function addCartanOptions(output){
	Cartan_list = output.split("\"Cartan number")
	nr_Cartans = Cartan_list.length-1
	const div = $('<div>').attr({
		"id": "Cartan_div",
		"class": "form-group"
	})
	const choose_Cartan = $('<select>').attr({
		"id": "Cartan",
		"class": "selectpicker",
		"data-width": "85%",
		"title": "choose Cartan",
		"method": "POST",
		"onchange": "changeSpecify(\"Cartan\")"
	})
	$('#specify').append(div);
	$('#Cartan_div').append(choose_Cartan)
	for (i=0; i<nr_Cartans; i++){
		$('#Cartan').append($("<option>").attr("value", "Cartan_"+i).text("Cartan number "+i))
	}
	$('.selectpicker').selectpicker('refresh');

}


