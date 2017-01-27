var struc = [
	{"topic":"Structure Theory",
	"id":"str_thy",
	"specify":["group","rank","Cartan"],
	"show":[
		{"name":"Cartan Subgroups",
		"require":["group","rank"]},
		{"name":"Real Forms",
		"require":["group","rank"]},
		{"name":"Distinguished Involution",
		"require":["group","rank"]},
		{"name":"Simple Roots",
		"require":["group","rank"]},
		{"name":"KGB Elements",
		"require":["group","rank"]},
		{"name":"KGB Orbits of Real Weyl Group",
		"require":["group","rank","Cartan"]}
		]
	},
	{"topic":"Representation Theory",
	"id":"rep_thy",
	"specify":["rep_category","param"],
	"show":[
		{"name":"Branch Irreducible",
		"require":["rep_category","param"]},
		{"name":"Branch Standard",
		"require":["rep_category","param"]},
		{"name":"Unitarity",
		"require":["rep_category","param"]}
		]
	},
	{"topic":"mock topic",
	"id":"mock_topic",
	"specify":["mock1","mock2"],
	"show":[
		{"name":"show1",
		"require":["mock1"]}
		]
	}
]


$( document ).ready($.each(struc, function(i,item){
	console.log("trying to append "+item.topic)
	$( '#topics' ).append("<p>something</p>")
}))


