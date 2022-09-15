
var server = "http://localhost:8888";

$('document').ready(function() {
$('#refresh').click(function() {
	$.get(server+"/instances", function(data, status) {
		console.log(data);
		console.log(status);
	});
});
});
