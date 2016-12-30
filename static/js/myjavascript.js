function show(targets){
    for (i = 0; i < targets.length; i++) { 
        document.getElementById(targets[i]).style.display = 'block';
    }
};


$.getJSON('static/json/structure.json')
	.done(function (data) {
		var structure = data;
		console.log(structure);
		addTopic('#topics',structure);
})

function addTopic(appendTo, structure) {
	$.each(structure, function(i,item) {
		const button = $("<button>").attr({"id":item.id,"type":"button","class":"btn btn-default btn-lg"}).text(item.topic).click(clickCallback(item));
		$(appendTo).append(button);
	})
}

function clickCallback(item) {
    return function() {
        addToLastcol(item.show);
		addToSpecify(item.specify);
		populateGroupDropdown();
    }
}

function addToLastcol(list) {
	$('#lastcol').empty();
	$('#lastcol').append("<h4>Show:</h4>");
	$.each(list, function(i, item) {
		const button = $("<button>").attr({"type":"button","class":"btn btn-default btn-md"}).text(item.name)
		$('#lastcol').append(button);
	})
}

function addToSpecify(list) {
	$('#specify').empty();
	$('#specify').append("<h4>Specify:</h4>");
	$.each(list, function(i,item) {
		console.log(item);
		const dropdown = $("<select>").attr({"id":item, "class":"selectpicker", "data-width":"85%", "title":"pick a "+item});
		$('#specify').append(dropdown).append("<br><br>");
	})
	$('.selectpicker').selectpicker('refresh');
}

// get the list of groups in groups.json and use it to populate the "pick a group" dropdown menu
function populateGroupDropdown() {
	$.getJSON('static/json/groups.json')
		.done(function (data) {
			var group_list = data;
			console.log(group_list);
			$.each(group_list, function(i,group) {
				$('#group').append($("<option>").attr("value", group.id).text("\$"+group.name+"\$"));});
			$('.selectpicker').selectpicker('refresh');
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	});
}

