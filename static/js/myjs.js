function getStruc(){
    return $.getJSON('static/json/structure_new.json');
}
function getGrps(){
    return $.getJSON('static/json/groups.json');
}

// define variables
var struc;
var grps;

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
        clearPrevious(['specify','show','further','atlas_output']);
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
            console.log(item.id)
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


// add content to specify column
function addSpecify(item){
    $('#specify').append("<h4 id=\"header_specify\">Specify:</h4>");
    var first_spec = item.specify[0];
    if (first_spec === 'group'){
        const div = div_const(first_spec);
        const dropdown = dropdown_const(first_spec);
        $('#specify').append(div);
        $('#'+first_spec+'_div').append(dropdown);
        document.getElementById("group").setAttribute("onchange","changeSpecify(\'group\',\'"+item+"\')");
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

// the change in column specify triggered by dropdown selections
function changeSpecify(changed_item, topic_item){
    if (changed_item === "group"){
        grp_selected = document.getElementById("group").value;
        clearElements(getIdsBelow("group_div","specify"));
        $.each(grps, function(i,item){
            if (item.id === grp_selected){
                addGrpParam(item.need_param);
            }
        })
    }
}

// add dropdowns for group parameters
function addGrpParam(param_list){
    if (param_list.length === 1){
        addDropdown("n","specify");
        //setOnchangeFuncs("n","");
        for (var i=1; i<9; i++){
            $('#n').append($('<option>').attr("value",i).text("\$n="+i+"\$"));
        }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,'n']);
    } else if (param_list.length === 2){
        addDropdown("p","specify");
        setOnchangeFuncs("p","addQ()");
        for (var i=1; i<9; i++){
            $('#p').append($('<option>').attr("value",i).text("\$p="+i+"\$"));
        }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,'p']);
    }
        $('.selectpicker').selectpicker('refresh');
}

// add q parameter
function addQ(){
    addDropdown("q","specify");
    p_node = document.getElementById('p');
    p_val = p_node.value;
    for (var i=1; i<9-p_val; i++){
        $('#q').append($('<option>').attr("value",i).text("\$q="+i+"\$"));
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,"q"]);
    $('.selectpicker').selectpicker('refresh');
}

function addDropdown(id,column){
    const div = div_const(id);
    const dropdown = dropdown_const(id);
    $('#'+column).append(div);
    $('#'+id+'_div').append(dropdown);
}

// set the onchange functions to execute 
function setOnchangeFuncs(id,funcs){
    node = document.getElementById(id);
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
        clearPrevious(['further','atlas_output']);
        highlightShowButton(item_clicked,topic_item);
        processShowClick(item_clicked,topic_item);
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
    first_further = item_clicked.further_require[0];
    if (first_further === "Cartan"){
        const div = div_const(first_further);
        const dropdown = dropdown_const(first_further);
        $('#further').append(div);
        $('#'+first_further+'_div').append(dropdown);
        $('.selectpicker').selectpicker('refresh');
    }
}
