const loginForm = document.getElementById("register-form");
const loginButton = document.getElementById("register-form-submit");
const loginErrorMsg = document.getElementById("register-error-msg");

// const registerForm = document.getElementById("register-form");
// const registerButton = document.getElementById("register-form-submit");
// const loginErrorMsg = document.getElementById("login-error-msg");


var cred = [];
// var cred = {
//     usn  : null,
//     pwd : null,
//     mld  : null
//     };

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "1234" && password === "1234") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})

// registerButton.onclick = function () { 
     //  location.href = "C:\\Users\\Joakim\\Desktop\\Bachelor Project\\Pysynth\\Synth_Authorizer-main\\Synth_Authorizer-main\\Authsynth\\main.html";
     //  window.location.href = "..\\Authsynth\\main.html";
     //  location.href = "..\\Authsynth\\main.html";
        //};
// registerButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     alert("You have successfully logged in.");
//     })