
var server = "http://localhost:8888";
var tableData = [];

function createIndexId(id, index) {
	return id + '-' + index;
}
function extractIndexId(id) {
	return id.split('-')[-1];
}

function delBtnClick(id) {
	let index = extractIndexId(id);
	let instance_id = data[i][columns[0]];
	console.log(instance_id);
	console.log(i);
	$.ajax({
		url: server+'/instances/'+instance_id,
		type: 'DELETE',
		success: function(result) {
			alert('Successfully deleted ' + instance_id);
		}
	});
}

function updateTable(data) {
	tableData = data;
	let table = document.getElementById('instance-table');
	let rowClass = 'instance-table-item';
	let columns = ['id', 'created', 'status', 'actions']; // has to match sql column names
	
	const rows = document.querySelectorAll('.'+rowClass);
	rows.forEach(row => {
		row.remove();
	});

	for (let i = 0; i < data.length; i++) {
		let tr = document.createElement('tr');
		tr.classList.add(rowClass);

		for (let j = 0; j < columns.length; j++) {
			let td = document.createElement('td');
			switch (columns[j]) {
			case 'actions':
				let delBtn = document.createElement('button');
				delBtn.innerHTML = 'DELETE';
				delBtn.id = 'instance-delBtn-'+i;
				delBtn.addEventListener('click', function(event) {
					let id = event.target.id;
					let index = extractIndexId(id);
					let instance_id = data[i][columns[0]];
					console.log(instance_id);
					console.log(i);
					$.ajax({
						url: server+'/instances/'+instance_id,
						type: 'DELETE',
						success: function(result) {
							document.getElementById('refresh').click();
							alert('Successfully deleted ' + instance_id);
						}
					});
				});
				td.appendChild(delBtn);
				break;
			default:
				td.innerHTML = data[i][columns[j]].slice(-12);
				break;
			}
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

$('.instance-delBtn').on('click', function(event) {
	let i = extractIndexId($(this).attr('id'));
	let instance_id = data[i][columns[0]];
	console.log(instance_id);
	console.log(i);
	$.ajax({
		url: server+'/instances/'+instance_id,
		type: 'DELETE',
		success: function(result) {
			alert('Successfully deleted ' + instance_id);
		}
	});
});
});
