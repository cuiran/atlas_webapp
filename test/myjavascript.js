$(document).ready(function() {

	const options = [
		{ 
			name: 'Structure Theory',
			sublevel: {
				groups:  ['a', 'b', 'c'],
				cartan: [1, 2, 3]
			}
		},
		{
			name: 'K Type & Branching',
			sublevel: {
				groups:  ['d', 'e', 'f'],
				cartan: [4, 5, 6]
			}
		},
		{
			name: 'Representation'
		},
		{
			name: 'KLV Polynomials'
		},
		{
			name: 'Unitary Representations'
		},
		{
			name: 'Induction'
		},
		{
			name: 'Complex Groups'
		}
	];
	addButtons('#first-column', options);
	
});

function selectColumn(option) {
	console.log(option.data.sublevel.groups[0]);
	$('#groups').empty();
	for (const opt of option.data.sublevel.groups) {
		$('#groups').append($('<option>', {
			text: opt
		}));
	}
}

function addButtons(appendTo, group) {
	for (const opt of group) {
		const button = $('<button/>', {
			text: opt.name,
			id: `btn_${opt.name}`,
			class: 'btn btn-default btn-lg'
		}).click(opt, selectColumn)
		$('#first-column').append(button);
	}
}
