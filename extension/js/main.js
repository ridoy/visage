
console.log("Hey");

function fillFields() {
	console.log("function is being called");
	var emailBox = document.getElementById('email');
	emailBox.value = "mjv359@aol.com";
}

function handleError() {
	console.log('uh oh');
}

fillFields("Yup");