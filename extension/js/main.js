function fillFields() {
	console.log("function is being called");
	var emailBox = document.getElementById('email');
	emailBox.value = "mjv359@aol.com";

	var passBox = document.getElementById('pass');
	passBox.value = "michaelgarvey";
}

function logIn() {
	var logIn = document.getElementById('u_0_n');
	logIn.click();
}


function handleError() {
	console.log('uh oh');
}

fillFields();
logIn();
