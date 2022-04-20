const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

// const registerForm = document.getElementById("register-form");
// const registerButton = document.getElementById("register-form-submit");
// const loginErrorMsg = document.getElementById("login-error-msg");
var usn = localStorage.getItem("usn");
var pwd = localStorage.getItem("pwd");


loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === usn && password === pwd) {
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