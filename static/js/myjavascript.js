function show(targets){
    for (i = 0; i < targets.length; i++) { 
        document.getElementById(targets[i]).style.display = 'block';
    }
};

$.getJSON('static/json/groups.json')
	.done(function (data) {
		var group_list = data;
		console.log(group_list);
		$.each(group_list, function(i,group) {
			$('#groups').append($("<option>").attr("value", group.id).text("\$"+group.name+"\$")).selectpicker('refresh');});
});


