function getStruc(){
    return $.getJSON('static/json/structure.json');
}
function getGrps(){
    return $.getJSON('static/json/groups.json');
}

// define variables
var struc;
var grps;
var reps = [
//    {"id":"finite","name":"Finite Dimensional"},
    {"id":"ds","name":"Discrete Series"},
    {"id":"minimal_split_ps","name":"Minimal Principal Series (split groups)"}
    ];

//load json objects into variables and populate the topics column
$($.when(getStruc()).then(function(data) {
    struc = data;
    addTopics('#topics');
}))
$.when(getGrps()).then(function(data){
    grps = data;
})

//add topics and click reactions for each button
function addTopics(col_id){
    $.each(struc, function(i,item) {
        const button = $("<button>").attr({"id":item.id,"type":"button","class":"btn btn-default btn-lg"}).text(item.topic).click(topicClickReaction(item));
        $(col_id).append(button);
    })
}

function topicClickReaction(item){
    return function(){
        highlightTopicButton(item.id);
        clearPrevious(['specify','show','further','atlas_input_output']);
        addSpecify(item);
        addShow(item);
    }
}

//keep topic button highlighted throughout session
function highlightTopicButton(topic_id){
    $.each(struc, function(i,item){
        if (item.id === topic_id){
            $("#"+item.id).addClass('active');
        } else {
            $("#"+item.id).removeClass('active');
        }
    })
}

//keep show button highlighted throughout session
function highlightShowButton(show_id,topic_item){
    $.each(topic_item.show,function(i,item){
        if (item.id === show_id.id){
            $('#'+item.id).addClass('active');
        } else {
            $('#'+item.id).removeClass('active');
        }
    })
}

// clear displays from previous topic session
function clearPrevious(list){
    $.each(list, function(i,item){
        $('#'+item).empty();
    })
}
function clearElements(list){
    $.each(list,function(i,item){
        $('#'+item).empty();
        $('#'+item).remove();
    })
}

// deactivate active show button
function deactivateActiveShow(){
	show_node = document.getElementById("show");
	active_show = show_node.getElementsByClassName("active");
	if (active_show.length != 0){
		active_show_id = active_show[0].id;
		$('#'+active_show_id).removeClass('active');
	}
}


// add content to specify column
function addSpecify(item){
    $('#specify').append("<h4 id=\"header_specify\">Specify:</h4>");
    var first_spec = item.specify[0];
    if (first_spec === 'group'){
        const div = div_const(first_spec);
        const dropdown = dropdown_const(first_spec);
        $('#specify').append(div);
        $('#'+first_spec+'_div').append(dropdown);
        document.getElementById("group").setAttribute("onchange","changeSpecify(\'group\',\'"+item.id+"\')");
        populateGroupDropdown();
    }
    $('.selectpicker').selectpicker('refresh');
}

// div and dropdown constant generating functions
function div_const(item){
    const div = $('<div>').attr({
        "id": item+"_div",
        "class": "form-group"
    })
    return div
}

function dropdown_const(item){
    const dropdown = $('<select>').attr({
        "id": item,
        "class": "selectpicker",
        "data-width":"40%",
        "data-windowPadding":"[5px,25px,5px,5px]",
        "title":item,
        "method":"POST"
    })
    return dropdown 
}

function small_dropdown_const(item){
    const dropdown = $('<select>').attr({
        "id":item,
        "class":"selectpicker",
        "data-width":"20%",
        "data-windowPadding":"[5px,5px,5px,5px]",
        "method":"POST",
        "title":"\$\\pm\$"
    })
    return dropdown
}

// dropdown menu for groups
function populateGroupDropdown(){
    $.each(grps, function(i,group){
        $('#group').append($('<option>').attr("value",group.id).text("\$"+group.name+"\$"))
    });
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"group"]);
    $('.selectpicker').selectpicker('refresh');
}

// add content to show column
function addShow(item){
    $('#show').append("<h4 id=\"header_show\">Show:</h4>");
    $.each(item.show,function(i,show_item){
        const button = $('<button>').attr({
            "type":"button",
            "class":"btn btn-default btn-md",
            "id":show_item.id
        }).text(show_item.name).click(showClickReaction(show_item,item));
        $('#show').append(button);
    })   
}

// display a notice that reminds people to choose show item
function displayNotice(){
    $('#specify').append("<h3 id=\'notice_choose_show\'>Choose an item to show \&rarr;</h3>");
}

// the change in column specify triggered by dropdown selections
function changeSpecify(changed_item, topic_item){
    if (changed_item === "group"){
        grp_selected = document.getElementById("group").value;
        clearElements(getIdsBelow("group_div","specify"));
		deactivateActiveShow();
        $.each(grps, function(i,item){
            if (item.id === grp_selected){
                addGrpParam(item.need_param,topic_item);
            }
        })
    } else if (changed_item === "n"){
        if (topic_item === "rep_thy"){
            addRepCat(changed_item,topic_item);
        } else if (topic_item === "str_thy"){
            displayNotice()
        }
    } else if (changed_item === "q"){
        if (topic_item === "rep_thy"){
            addRepCat(changed_item,topic_item);
        } else if (topic_item === "str_thy"){
            displayNotice()
        }
    } else if (changed_item === "rep"){
        addRepParam(changed_item,topic_item);
    }
}

// add dropdowns for group parameters
function addGrpParam(param_list,topic_item){
    if (param_list.length === 1){
        addDropdown("n","specify");
        grp_selected = document.getElementById("group").value;
        if ((topic_item === "rep_thy") && (grp_selected === "SL(n,R)")){
            for (var i=2;i<3;i++){
                $('#n').append($('<option>').attr("value",i).text("\$n="+i+"\$"));
            }
        } else {
            for (var i=1; i<9; i++){
                $('#n').append($('<option>').attr("value",i).text("\$n="+i+"\$"));
            }
        }
        document.getElementById('n').setAttribute("onchange",["clearElements(getIdsBelow(\'n_div\',\'specify\'))","deactivateActiveShow","changeSpecify(\'n\',\'"+topic_item+"\')"]);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,'n']);
    } else if (param_list.length === 2){
        addDropdown("p","specify");
        document.getElementById('p').setAttribute("onchange",["clearElements(getIdsBelow(\'p_div\',\'specify\'))","addQ(\'"+topic_item+"\')","deactivateActiveShow()"]);
        for (var i=1; i<9; i++){
            $('#p').append($('<option>').attr("value",i).text("\$p="+i+"\$"));
        }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,'p']);
    }
        $('.selectpicker').selectpicker('refresh');
}

// add q parameter
function addQ(topic_item){
    addDropdown("q","specify");
    p_node = document.getElementById('p');
    p_val = p_node.value;
    for (var i=1; i<9-p_val; i++){
        $('#q').append($('<option>').attr("value",i).text("\$q="+i+"\$"));
    }
    document.getElementById('q').setAttribute("onchange",["clearElements(getIdsBelow(\'q_div\',\'specify\'))","deactivateActiveShow()","changeSpecify(\'q\',\'"+topic_item+"\')"]);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"q"]);
    $('.selectpicker').selectpicker('refresh');
}



// add dropdown for reps 
function addRepCat(changed_item,topic_item){
    addDropdown("rep","specify");
    $.each(reps,function(i,item){
        $('#rep').append($('<option>').attr("value",item.id).text(item.name));
    })
    document.getElementById('rep').setAttribute("onchange",["clearElements(getIdsBelow(\'rep_div\',\'specify\'))","deactivateActiveShow()","changeSpecify(\'rep\',\'"+topic_item+"\')"]);
    $('.selectpicker').selectpicker('refresh');
}

//add dropdown for representation parameters
function addRepParam(changed_item,topic_item){
    console.log("addRepParam is called")
    var rep_cat = document.getElementById(changed_item).value;
    if (rep_cat === "finite"){
        addFiniteParams();
    } else if (rep_cat === "ds"){
        isEqualRk(changed_item,topic_item);
    } else if (rep_cat === "minimal_split_ps"){
        isSplit(changed_item,topic_item);
    }
}

// check if a group is equal rank
function isEqualRk(changed_item,topic_item){
    var val_dict = get_val_dict();
    val_dict['request'] = "is_equal_rank";
    ajax_post(val_dict);
}

function isSplit(changed_item,topic_item){
    var val_dict = get_val_dict();
    val_dict['request'] = "is_split";
    ajax_post(val_dict);
}

// check if element is in list
function inList(elem, l){
    if (l.indexOf(elem)>=0){
        return true
    } else {
        return false
    }
}

// add parameters if user chose finite dimensional 
//function addFiniteParams(){
//    console.log("addFiniteParams called");
//}

// get rho(G) if user chose discrete series
function getRho(){
    var val_dict = get_val_dict();
    val_dict['request'] = 'rho';
    ajax_post(val_dict);
}

// check if discrete series exists
function DSExists(output){
//  incorrect in some cases:
//    true_false = output.slice(1,-1).split("\\n")[2].split(":")[1].replace(/ /g,'');
//  instead, look for Value: true/false
    true_false = output.slice(1,-1).split("Value:")[1].replace(/ /g,''); 
    if (true_false === "true"){
        getRho();
    } else {
        const div = $('<div>').attr({"id":"unequal_rk_warning","class":"form-group"})
        $('#specify').append(div);
        $('#unequal_rk_warning').append("<p>This group doesn't have discrete series.</p>");
    }
}

// check if group is split
function PSExists(output){
    true_false = output.slice(1,-1).split("Value:")[1].replace(/ /g,''); 
    if (true_false === "true"){
        getRho();
    } else {
        const div = $('<div>').attr({"id":"not_split_warning","class":"form-group"})
        $('#specify').append(div);
        $('#not_split_warning').append("<p>This group is not split.</p>");
    }
}


// add DS parameter input options
function addDSParams(output){
//  incorrect in some cases:
//    var rho = output.slice(1,-1).split("\\n")[2].split(":")[1].replace(/ /g,'');
    var rho = output.slice(1,-1).split("Value:")[1].replace(/ /g,''); 
    if (rho.slice(-1) === "1"){
        var is_int = true;
    } else if (rho.slice(-1) === "2"){
        var is_int = false;
    }
    var num_inputs = output.split(",").length;
    const div = $('<div>').attr({"id":"dsinstru_div","class":"form-group"})
    $('#specify').append(div);
    $('#dsinstru_div').append("<p>rho="+rho);
    const param_div = $('<div>').attr({"id":"dsparam_div","class":"form-group"})
    $('#specify').append(param_div);
    if (is_int){
        $('#dsparam_div').append("<p>Input Harish-Chandra parameters (all integers):</p>");
    } else {
        $('#dsparam_div').append("<p>Input Harish-Chandra parameters (all half integers):</p>");
    }
    for (var i=1;i<num_inputs;i++){
        $('#dsparam_div').append("<input type=\"float\" id="+i+" maxlength=\"5\" size=\"4\">");
        $('#dsparam_div').append(", ");
    }
    $('#dsparam_div').append("<input type=\"float\" id="+num_inputs+" maxlength=\"5\" size=\"4\">");
    setOnchangeFuncs(num_inputs,"clearElements([\"notice_choose_show\"]),displayNotice()");
}

// add Principal Series parameter input options
function addPSParams(output){
    var rho = output.slice(1,-1).split("Value:")[1].replace(/ /g,''); 
    var num_inputs = output.split(",").length;
    const div = $('<div>').attr({"id":"psinstru_div","class":"form-group"})
    $('#specify').append(div);
    $('#psinstru_div').append("<p>rho="+rho);

    const nu_div = $('<div>').attr({"id":"nu_div","class":"form-group"})
    const epsilon_div = $('<div>').attr({"id":"epsilon_div","class":"form-group"})
    // add division for parameter nu
    $('#specify').append(nu_div);
    $('#nu_div').append("<p>Input nu parameter (rationals):</p>");
    for (var i=1;i<num_inputs;i++){
        $('#nu_div').append("<input type=\"float\" id="+i+" maxlength=\"5\" size=\"4\">");
        $('#nu_div').append(", ");
    }
    $('#nu_div').append("<input type=\"float\" id="+num_inputs+" maxlength=\"5\" size=\"4\">");
    // add division for parameter epsilon
    $('#specify').append(epsilon_div);
    $('#epsilon_div').append("<p>Input character of M parameter (signs):</p>");
    for (var i=1;i<num_inputs;i++){
        $('#epsilon_div').append(small_dropdown_const("epsilon_"+i));
        $('#epsilon_'+i).append($('<option>').attr("value","pos").text("\$+\$"));
        $('#epsilon_'+i).append($('<option>').attr("value","neg").text("\$-\$"));
        $('#epsilon_div').append(", ");
    }
    $('#epsilon_div').append(small_dropdown_const("epsilon_"+num_inputs));
    $('#epsilon_'+num_inputs).append($('<option>').attr("value","pos").text("\$+\$"));
    $('#epsilon_'+num_inputs).append($('<option>').attr("value","neg").text("\$-\$"));
    setOnchangeFuncs("epsilon_"+num_inputs,"clearElements([\"notice_choose_show\"]),displayNotice()");
    $('.selectpicker').selectpicker('refresh');
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,'epsilon_div'])
}

// add Finite Dimensional parameter input options
function addFiniteParams(output){
//  incorrect in some cases:
//    var rho = output.slice(1,-1).split("\\n")[2].split(":")[1].replace(/ /g,'');
    var rho = output.slice(1,-1).split("Value:")[1].replace(/ /g,''); 
    var num_inputs = output.split(",").length;
    const div = $('<div>').attr({"id":"fdinstru_div","class":"form-group"})
    $('#specify').append(div);
    $('#fdinstru_div').append("<p>rho="+rho);
    $('#fdinstru_div').append("<p>Input Highest Weight (all integers):</p>");
    const param_div = $('<div>').attr({"id":"fdparam_div","class":"form-group"})
    $('#specify').append(param_div);
    for (var i=1;i<num_inputs;i++){
        $('#fdparam_div').append("<input type=\"float\" id="+i+" maxlength=\"5\" size=\"4\">");
        $('#fdparam_div').append(", ");
    }
    $('#fdparam_div').append("<input type=\"float\" id="+num_inputs+" maxlength=\"5\" size=\"4\">");
}


function addDropdown(id,column){
    const div = div_const(id);
    const dropdown = dropdown_const(id);
    $('#'+column).append(div);
    $('#'+id+'_div').append(dropdown);
}

// set the onchange functions to execute 
function setOnchangeFuncs(id,funcs){
    var node = document.getElementById(id);
    node.setAttribute("onchange",funcs);
}

// get list of element id's that are below the given id in the given column
function getIdsBelow(id,column){
    var specs_onscreen = document.getElementById('specify').children;
    var specs_ids = [specs_onscreen[0].id]
    for (var i=1; i<specs_onscreen.length; i++){
        specs_ids.push(specs_onscreen[i].id);
    }
    var id_index = specs_ids.indexOf(id);
    if (id_index+1<=specs_ids.length){
        var ids_below = specs_ids.slice(id_index+1,specs_ids.length)
        return ids_below
    } else {
        return []
    }
}

// reaction functions triggered by clicking buttons in the show column
function showClickReaction(item_clicked,topic_item){
    return function(){
        clearPrevious(['further','atlas_input_output']);
        highlightShowButton(item_clicked,topic_item);
        processShowClick(item_clicked,topic_item);
        var val_dict = get_val_dict();
        ajax_post(val_dict);
    }
}

// add elements to further specs if needed, if not then call server for results
function processShowClick(item_clicked,topic_item){
    if (item_clicked.further_require){
        addFurtherRequired(item_clicked,topic_item);
    }
}

// add to further column
function addFurtherRequired(item_clicked,topic_item){
    $('#further').append("<h4 id=\"header_further\">Further Specify:</h4>");
    var first_further = item_clicked.further_require[0];
    if (first_further === "Cartan"){
        const div = div_const(first_further);
        const dropdown = dropdown_const(first_further);
        $('#further').append(div);
        $('#'+first_further+'_div').append(dropdown);
        $('.selectpicker').selectpicker('refresh');
    }
}

// post user input and get atlas output
function ajax_post(val_dict){
    $.ajax({
        type:'POST',
        url:'/runatlas',
        contentType:'json',
        data: JSON.stringify(val_dict),
        success: function(data){
            react(val_dict,data);
        }
    })
}

// get user input values into a dictionary
function get_val_dict(){
    var val_dict = {};
    var topic_node = document.getElementById("topics");
    var active_topic_id = topic_node.getElementsByClassName("active")[0].id;
    var struc_selected = $.grep(struc, function(e){return e.id===active_topic_id})[0]
    val_dict["topic"] = active_topic_id;
    var spec_divs_onscreen = document.getElementById("specify").children;
    for (var i=1; i<spec_divs_onscreen.length; i++){
        var div_id = spec_divs_onscreen[i].id;
        var child_id = div_id.slice(0,-4);
        var exceptions = ["dsinstru","psinstru","dsparam","nu","epsilon","notice_choose_"];
        if (!(inList(child_id,exceptions))){
            val_dict[child_id] = document.getElementById(child_id).value;
        } else if (inList(child_id,["dsinstru","psinstru"])){
            val_dict[child_id] = document.getElementById(child_id+'_div').innerHTML;
        } else if (inList(child_id,["dsparam","nu"])){
            param_boxes = document.getElementById(child_id+'_div').children;
            var param_array = []
            for (var j=1;j<param_boxes.length;j++){
                box_id = param_boxes[j].id;
                param_array.push(document.getElementById(box_id).value)
            }
            val_dict[child_id] = param_array;
        } else if (child_id === "epsilon"){
            sign_dropdowns = document.getElementById(child_id+'_div').children;
            var sign_array = []
            for (var k=1;k<sign_dropdowns.length;k++){
                sign_array.push(document.getElementById(child_id+'_'+k).value)
            }
            val_dict[child_id] = sign_array
        }
    }
    var show_node = document.getElementById("show");
    if (show_node.getElementsByClassName("active").length != 0){
        var active_show_id = show_node.getElementsByClassName("active")[0].id;
        val_dict["show"] = active_show_id;
        var show_selected = $.grep(struc_selected.show, function(e){return e.id===active_show_id})[0]
        if ("further_require" in show_selected){
            val_dict["further"] = {}
            $.each(show_selected.further_require, function(i,item){
                val_dict.further[item] = document.getElementById(item).value
            })
        }
    } else {
        val_dict["show"] = "";
    }
    return val_dict   
}

function react(val_dict,output){
    var show_id = val_dict['show']
    if (show_id === "Cartan_Subgroups"){
        showRawOutput(output);
    }
    else if (show_id === "Real_Forms"){
        showRawOutput(output);
    }
    else if (show_id === "Distinguished_Involution"){
        showRawOutput(output);
    }
    else if (show_id === "Simple_Roots"){
        showRawOutput(output);
    }
    else if (show_id === "KGB_Elements"){
        showRawOutput(output);
    }
    else if (show_id === "Real_Weyl_Group"){
        if (val_dict['further']['Cartan'] == ""){
            addCartanOptions(output);
        } else {
            showRawOutput(output);
        }
    } 
    else if (show_id === ""){
        if (val_dict['rep'] === "ds"){
            if (val_dict['request'] === 'is_equal_rank'){
                DSExists(output)
            } else {
                addDSParams(output);
            }
        }
        else if (val_dict['rep'] === "minimal_split_ps"){
            if (val_dict['request'] === 'is_split'){
                PSExists(output)
            } else {
                addPSParams(output);
            }
	}
        else if (val_dict['rep'] === "finite"){
                addFDParams(output);
        }	
    }
    else if (show_id === "Unitarity"){
	console.log("Unitarity selected");
        showRawOutput(output)
    }
    else if (show_id === "information_on_parameter"){
	console.log("information selected");
        showRawOutput(output)
    }
    else if (show_id === "Branch_to_K"){
	console.log("Branch to K selected");
        showRawOutput(output)
    }
    else if (show_id === "composition_series"){
	console.log("Composition Series selected");
        showRawOutput(output)
    }
    else if (show_id === "character_formula"){
	console.log("Character Formula selected");
        showRawOutput(output)
    }
}

function showRawOutput(in_output){
//    var input = "sample input";
    var input =  JSON.parse(in_output);
    var output = JSON.parse(in_output);
    var output_text = output.replace(/[\s\S]*END INPUT/i,"");
    $('#atlas_input_output').empty();
    const checkbox_div = $('<div>').attr({"id":"checkbox_div"});
    const checkbox = "<input type=\'checkbox\' id = \'show_input_checkbox\'> <label for=\'show_input_checkbox\'>Show atlas input </label>";
    $('#atlas_input_output').append(checkbox_div);
    $('#checkbox_div').append(checkbox);
    $('#show_input_checkbox').on("click",function(){showAtlasInput(input)});
    //setOnchangeFuncs("show_input_checkbox","showAtlasInput()");
    $('#atlas_input_output').append(output_text);
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"atlas_input_output"]);
}


function showAtlasInput(input){
    var checkboxElm = document.getElementById("show_input_checkbox");
    if (checkboxElm.checked){
	var text1=input.replace(/.*START INPUT/i,"");
	var text2=text1.replace(/END INPUT[\s\S]*/i,"");
        clearElements(['atlas_input_div']);
        const input_div = $('<div>').attr({
            "id": "atlas_input_div"
        });
        $("#checkbox_div").after(input_div);
        $('#atlas_input_div').append("<h4 id=\"input_header\">Atlas Code:</h4>");
//        $('#atlas_input_div').append("start of input");
        $('#atlas_input_div').append(text2);
//        $('#atlas_input_div').append("end of input");
    } else {
        clearElements(['atlas_input_div']);
    }
}


function addCartanOptions(output){
    if (document.getElementById('Cartan').options.length<=1){
        Cartan_list = JSON.parse(output);
        for (var i=0;i<Cartan_list.length/2;i++){
            $('#Cartan').append($("<option>").attr({"value":i,"title":"Cartan "+i}).text(Cartan_list[2*i+1]))
        }
        setOnchangeFuncs("Cartan","clearPrevious([\'atlas_input_output\']),furtherClickReaction(\'Cartan\')")
        $('.selectpicker').selectpicker('refresh');
    }
}

function furtherClickReaction(item){
    var val_dict = get_val_dict();
    ajax_post(val_dict);
}
