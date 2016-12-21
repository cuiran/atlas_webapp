function show(targets){
    for (i = 0; i < targets.length; i++) { 
        document.getElementById(targets[i]).style.display = 'block';
    }
}

// populate dropdown menu with id="groups"
$(function() {
	$('#cartans').append($("<option/>").text("Option 3"));
});
