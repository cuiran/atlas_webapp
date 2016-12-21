function show(targets){
    for (i = 0; i < targets.length; i++) { 
        document.getElementById(targets[i]).style.display = 'block';
    }
}

// fill in the dropdown manu with options of groups
$(function() {
	var g = $.getJSON("../json/groups.json", function(json) { console.log(json); })
		data = JSON.parse(g); 
	$.each(data, function(i,option) {
		$("#groups").append($('<option>').text(option.name));
		});
})
	
