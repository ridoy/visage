function signInFacebook() {
    var emailBoxFacebook = document.getElementById('email');
    emailBoxFacebook.value = "mjv359@aol.com";

    var passBoxFacebook = document.getElementById('pass');
    passBoxFacebook.value = "michaelgarvey";

    var logInFacebook = document.getElementById('u_0_n');
    logInFacebook.click();
}

function signInGMail() {
    var email = document.getElementById('Email');
    email.value = 'hackathontest321';

    var next = document.getElementById('next');
    next.click();

    setTimeout(function() {
        var password = document.getElementById('Passwd');
        password.value = 'hackathon123';

        var signIn = document.getElementById('signIn');
        signIn.click();
    }, 2000);
}

if (window.location.host === "www.facebook.com") {
        signInFacebook();
}

if (window.location.host === "accounts.google.com") {
        signInGMail();
}