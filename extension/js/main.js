function signInFacebook() {
	var emailBoxFacebook = document.getElementById('email');
	emailBoxFacebook.value = "mjv359@aol.com";

	var passBoxFacebook = document.getElementById('pass');
	passBoxFacebook.value = "michaelgarvey";

	var logInFacebook = document.getElementById('u_0_n');
	logInFacebook.click();
}

function signInTwitter() {
	var username = document.getElementsByClassName('js-username-field')[0];
	console.log(username);

	username.value = "hackathontest321@gmail.com";


	var password = document.getElementsByClassName('js-password-field')[0];
	password.value = "hackathon123";

	document.getElementsByClassName('submit btn primary-btn')[0].click();
}

if (window.location.host === "www.facebook.com") {
	signInFacebook();
}

if (window.location.host === "twitter.com") {
	signInTwitter();
}