
var server = "http://localhost:8888";

function updateTable(data) {	
	let table = document.getElementById('instance-table');
	let rowClass = 'instance-table-item';
	let columns = ['id', 'created', 'status']; // has to match sql column names
	
	const rows = document.querySelectorAll('.'+rowClass);
	rows.forEach(row => {
		row.remove();
	});

	for (let i = 0; i < data.length; i++) {
		let tr = document.createElement('tr');
		tr.classList.add(rowClass);

		for (let j = 0; j < columns.length; j++) {
			let td = document.createElement('td');
			td.innerHTML = data[i][columns[j]];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

$('document').ready(function() {
$('#create-instance').click(function() {
	$.post(server+'/instances', {}, function(data, status) {
		console.log(data);
		console.log(status);
	});
});

$('#refresh').click(function() {
	$.get(server+'/instances', function(data, status) {
		updateTable(data);
		console.log(data);
		console.log(status);
	});
});
});
