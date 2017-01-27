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

var func_dict = {"rank": addRank, "Cartan": addCartan, "type": addType, "param": addParam}

var reaction_dict = {}
reaction_dict['Cartan'] = [addCartanOptions]
reaction_dict['Cartan Subgroups'] = [scrollToInputOutput,showRawOutput]
reaction_dict['Real Forms'] = [scrollToInputOutput,showRawOutput]
reaction_dict['Distinguished Involution'] = [scrollToInputOutput,showRawOutput]
reaction_dict['Simple Roots'] = [scrollToInputOutput,showRawOutput]
reaction_dict['KGB Elements'] = [scrollToInputOutput,showRawOutput]
reaction_dict['Real Weyl Group'] = [scrollToInputOutput,showRawOutput]
reaction_dict['Branch to K'] = [scrollToInputOutput,showRawOutput]
reaction_dict['Unitarity']=[scrollToInputOutput,showRawOutput]
reaction_dict['Cuspidal Data'] = [scrollToInputOutput,showRawOutput]

// append one button to each topic listed in structure.json
// it also attach a function to the click event
function addTopic(appendTo) {
	$.each(struc, function(i,item) {
		const button = $("<button>").attr({"id":item.id,"type":"button","class":"btn btn-default btn-lg"}).text(item.topic).click(topicCallback(item));
		$(appendTo).append(button);
	})
}

// this is the click callback function
// the inside functions execute whenever the button is clicked
function topicCallback(item) {
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
		const button = $("<button>").attr({"type":"button","class":"btn btn-default btn-md","id":item.id}).text(item.name).prop('disabled',true).click(showCallback(item));
		$('#lastcol').append(button);
	})
}

function showCallback(item){
	return function(){
		highlightShowButton(item)
		runAtlas(item);
	}
}

function highlightShowButton(selected_show){
	var active_button_id = document.getElementById("topics").getElementsByClassName("active")[0].id;
	var show_options = $.grep(struc, function(e){return e.id===active_button_id})[0].show
	$.each(show_options, function(i,item){
		if (item.name===selected_show.name){
			$('#'+item.id).addClass('active');
		} else {
			$('#'+item.id).removeClass('active');
		}
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
		"data-width": "40%",
		"data-windowPadding": "[5px,25px,5px,5px]",
		"title": "choose "+item,
		"method": "POST",
		"onchange": "changeSpecify(\""+item+"\"),changeLastCol(\""+item+"\")"
	});
	const question_button = $("<button>").attr({"id":item+"_question","type":"button","class":"btn btn-circle btn-default btn-sm"}).text("?").click(clickQuestionCallBack(item));
	$('#specify').append(div);
	$('#'+item+'_div').append(dropdown).append(question_button);
	if ($('#group').length != 0){
		populateGroupDropdown();
	}
	$('.selectpicker').selectpicker('refresh');
}

function clickQuestionCallBack(item){
	if (item === "group"){
		return function(){question_group()}
	} else if (item === "rank"){
		return function(){question_rank()}
	} else if (item === "Cartan"){
		return function(){question_Cartan()}
	} else if (item === "type"){
		return function(){question_type()}
	} else if (item === "param"){
		return function(){question_param()}
	} else {
		return function(){console.log("not ready yet")}
	}
}

function question_Cartan(){
	$('#details').empty();
	$('#details').append("<h4>Cartan Options:</h4>").append("<p>Each option provides a triple \$(a,b,c)\$, which specifies a Cartan Subgroup with compact rank \$a\$, complex rank \$b\$, and split rank \$c\$.</p> <p>For a more detailed and mathematical explanation of these concepts, please look through the tutorial page on <a href=\'https://jeffreyadams.github.io/atlasofliegroups-docs/tutorial/video_1B/cartan_classes.html#cartan-subgroups\' target=\'_blank\'>Cartan Subgroups</a>.</p>")
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"details"]);
}

function question_group(){
	$('#details').empty();
	$('#details').append("<h4>Groups Options:</h4>").append("<p> Currently we have 8 choices of classical groups. The ones that needs p and q inputs are still under construction. </p>")
}

function question_rank(){
	$('#details').empty();
	$('#details').append("<h4>Rank Options:</h4>").append("<p>For computation efficiency, we provide rank option up to 8 for now.</p>")
}


function question_type(){
	$('#details').empty();
	$('#details').append("<h4>Representation Options:</h4>");
}

function question_param(){
	$('#details').empty();
	$('#details').append("<h4>Parameter Options:</h4>");
}
// get the list of groups in groups.json and use it to populate the "pick a group" dropdown menu
function populateGroupDropdown() {
	$.each(grp, function(i,group){
		$('#group').append($("<option>").attr("value",group.id).text("\$"+group.name+"\$"))})
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"group"]);
	$('.selectpicker').selectpicker('refresh');
}


function changeSpecify(item_changed){
	var topics_div = document.getElementById("topics")
	var active_button = topics_div.getElementsByClassName("active")[0];
	var active_button_id = active_button.id;
	var selected_topic = $.grep(struc, function(e){return e.id === active_button_id})[0];
	var specs = selected_topic.specify
	var index_changed = specs.indexOf(item_changed)
	var next_spec;
	if (specs.length == index_changed + 1){
		next_spec = "EndOfSpecs"
	} else{
		next_spec = specs[index_changed+1]
	}
	var val_dict ={};
	for (var i=0; i<=index_changed; i++) {
		val_dict[specs[i]] = document.getElementById(specs[i]).value; 
	}
	removeOutdate(item_changed,index_changed,specs)
	if (next_spec != "EndOfSpecs"){
		func_dict[next_spec](val_dict)
	} else {
		activateLastCol(selected_topic);
	}
}

function removeOutdate(item_changed,index_changed,specs){
	for (var i=index_changed+1; i<specs.length; i++) {
		if ($('#'+specs[i]+'_div').length != 0){
			$("#"+specs[i]+"_div").remove();
		}
	}
}

function addRank(val_dict){
	var group_selected = val_dict["group"]
	var grp_item = $.grep(grp, function(g){return g.id === group_selected})[0]
	var input_needed = grp_item.need_rank
	if (input_needed.length === 1) {
		const div = $("<div>").attr({
			"id": "rank_div",
			"class": "form-group"
		})
		const choose_rank = $("<select>").attr({
			"id": "rank",
			"class": "selectpicker",
			"data-width": "40%",
			"title" : "choose n",
			"method": "POST",
			"onchange": "changeSpecify(\"rank\"),changeLastCol(\"rank\")"
		});
		const question_button = $("<button>").attr({"id":"rank"+"_question","type":"button","class":"btn btn-circle btn-default btn-sm"}).text("?").click(clickQuestionCallBack("rank"));
		$('#specify').append(div);
		$('#rank_div').append(choose_rank).append(question_button);
		for (var i=1; i<9; i++){
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
	ajax_post(val_dict)
}

function ajax_post(some_dict) {
	$.ajax({
		type:'POST',
		url:'/newquery',
		contentType:'json',
		data: JSON.stringify(some_dict),
		success: function(data){
			var query_id = JSON.parse(data).query_id;
			console.log("information posted");
			postReact(query_id,some_dict)
		}
	})
}

function postReact(query_id,some_dict){
	requesting = some_dict.request
	ajax_get(query_id,reaction_dict[requesting])
}

function timeOutCallBack(query_id,func_array){
	return function() {
		ajax_get(query_id,func_array);
	}
}

function ajax_get(query_id, func_array){
	$.ajax({
		type: 'POST',
		url: '/checkquery',
		contentType: 'json',
		data: JSON.stringify({"query_id":query_id}),
		success: function(){
			console.log("checking query")
		},
		complete: function(output){
			out= JSON.parse(output.responseText) 
			out_stat = out.status
			if (out_stat === "SUCCESS") {
				console.log("query done")
				for (var i=0; i<func_array.length; i++){
					func_array[i](out.output)
				}
				document.getElementById("atlas_output").style.color="black"
			} else if (out_stat === "FAILED") {
				console.log("error occured")
				for (var i=0; i<func_array.length;i++){
					func_array[i](out.error)
				}
				document.getElementById("atlas_output").style.color="red"
			} else {
				setTimeout(timeOutCallBack(query_id,func_array),500)
			}
		}
	})
}

function addAvailCartans(output){
	$('#details').empty();
	$('#details').append($('<button>').attr({
		"id":"show_avail_Cartans",
		"type":"button",
		"style":"width:180px",
		"class":"btn btn-default btn-md"}).text("Available Cartans").click(function(){$('#availCartans').toggle()}))
	$('#details').append("<div id='availCartans' style='display:none'></div>")
	var text_list = output.split("\n")
	$('#availCartans').append("<h4>Available Cartans</h4>")
	for (var i=3; i<text_list.length-1; i++){
		$('#availCartans').append($("<p>").text(text_list[i]))
	}
}

function addCartanOptions(output){
	var Cartan_list = output.split("\"Cartan number")
	var nr_Cartans = Cartan_list.length-1
	const div = $('<div>').attr({
		"id": "Cartan_div",
		"class": "form-group"
	});
	const choose_Cartan = $('<select>').attr({
		"id": "Cartan",
		"class": "selectpicker",
		"data-width": "60%",
		"title": "choose Cartan",
		"method": "POST",
		"onchange": "changeSpecify(\"Cartan\"),changeLastCol(\"Cartan\")"
	});
	const question_button = $("<button>").attr({"id":"Cartan_question","type":"button","class":"btn btn-circle btn-default btn-sm"}).text("?").click(clickQuestionCallBack("Cartan"));
	$('#specify').append(div);
	$('#Cartan_div').append(choose_Cartan).append(question_button)
	for (var i=0; i<nr_Cartans; i++){
		var Cartan_ranks = Cartan_list[i+1].split("\n")[1]
		var ranks = Cartan_ranks.split(":").slice(1,4).join().split(",")
		$('#Cartan').append($("<option>").attr({"value":i, "title":'('+ranks[0]+','+ranks[2]+','+ranks[4]+' )'}).text(Cartan_ranks))
	}
	$('.selectpicker').selectpicker('refresh');

}

function changeLastCol(spec_id){
	var topics_div = document.getElementById("topics")
	var active_button = topics_div.getElementsByClassName("active")[0];
	var active_button_id = active_button.id;
	var last_col = document.getElementById('lastcol').children
	var selected_topic = $.grep(struc, function(e){return e.id === active_button_id})[0];
	for (var i=1; i<last_col.length;i++){
		var button_text = last_col[i].textContent
		var show_item = $.grep(selected_topic.show, function(e){return e.name === button_text})[0]
		var required_specs = show_item.require
		has_all = true
		for (var j=0; j<required_specs.length; j++){
			if (hasValue(required_specs[j])){ } else {has_all = false}
		}
		if (has_all) {last_col[i].disabled = false} else {last_col[i].disabled = true}
	}
}

function hasValue(id){
	var answer = false
	var e = document.getElementById(id)
	if (e){
		if (e.value){answer = true}
	}
	return answer
}

function activateLastCol(struc_item){
	var last_col = document.getElementById('lastcol').children
	for (var i=1;i<last_col.length;i++){
		last_col[i].disabled = false
	}
}

function runAtlas(item){
	var required_info = item.require
	var info_dict = {}
	info_dict["request"] = item.name
	for (var i=0; i<required_info.length;i++) {
		info_dict[required_info[i]] = document.getElementById(required_info[i]).value
	}
	ajax_post(info_dict)
}

function scrollToInputOutput(){
	$('html, body').animate({scrollTop:$('#atlas_input_output').position().top}, 300);
}

function showRawOutput(output){
	var text_list = output.split("\n")
	$('#atlas_output').empty()
	for (var i=0; i<text_list.length; i++){
		$('#atlas_output').append($('<p>').text(text_list[i]))
	}
}


function addType(){
	const div = $("<div>").attr({
		"id": "type_div",
		"class": "form-group"
	});
	const choose_type = $("<select>").attr({
		"id":"type",
		"class":"selectpicker",
		"data-width":"50%",
		"title":"category",
		"method":"POST",
		"onchange":"changeSpecify(\"type\"),changeLastCol(\"type\")"
	});
	const question_button = $("<button>").attr({"id":"type_question","type":"button","class":"btn btn-circle btn-default btn-sm"}).text("?").click(clickQuestionCallBack("type"));
	$('#specify').append(div);
	$('#type_div').append(choose_type).append(question_button);
	var rep_types = ['Finite Dimensional']
	$.each(rep_types,function(i,item){
		$('#type').append($("<option>").attr("value",item).text(item));
	})
	$('.selectpicker').selectpicker('refresh');
}

function addParam(){
	console.log("function addParam is called")
	selected_cat = document.getElementById("type").value
	if (selected_cat === "Finite Dimensional"){
		const div = $("<div>").attr({
			"id":"param_div",
			"class":"form-group"
		});
		const choose_param = $("<select>").attr({
			"id":"param",
			"class":"selectpicker",
			"data-width":"50%",
			"title":"which rep",
			"method":"POST",
			"onchange":"changeSpecify(\"param\"),changeLastCol(\"param\")"
		});
		const question_button = $("<button>").attr({"id":"param_question","type":"button","class":"btn btn-circle btn-default btn-sm"}).text("?").click(clickQuestionCallBack("param"));
		$('#specify').append(div);
		$('#param_div').append(choose_param).append(question_button);
		$('#param').append($("<option>").attr("value","trivial").text("Trivial Representation"));
		$('.selectpicker').selectpicker('refresh');
	}
}


