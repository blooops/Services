let users = JSON.parse(localStorage.getItem("users")) || {};
let loggedInUser = localStorage.getItem("loggedInUser");

// Redirect if logged in (except profile page)
if (loggedInUser && !window.location.href.includes("profile.html") && !window.location.href.includes("logout.html")) {
    window.location.href = "https://coldhotstar.framer.ai/home_type";
}

function maskInfo(input) {
    return input.includes("@") 
        ? input[0] + "****@" + input.split("@")[1] 
        : "+91" + input.slice(0, 2) + "******" + input.slice(-2);
}

function checkUser() {
    let input = document.getElementById("userInput").value.trim();
    if (users[input]) {
        document.getElementById("userDP").src = users[input].dp;
        document.getElementById("userDP").style.display = "block";
        document.getElementById("userName").innerText = users[input].fullName;
        document.getElementById("maskedInfo").innerText = maskInfo(input);
        document.getElementById("password").style.display = "block";
        document.getElementById("loginBtn").style.display = "block";
        document.getElementById("nextBtn").style.display = "none";
    } else {
        alert("User not registered!");
        window.location.href = "signup.html";
    }
}

function login() {
    let input = document.getElementById("userInput").value.trim();
    let password = document.getElementById("password").value;
    if (users[input].password === password) {
        localStorage.setItem("loggedInUser", input);
        window.location.href = "https://coldhotstar.framer.ai/home_type";
    } else {
        alert("Incorrect password!");
    }
}

function signup() {
    let emailOrPhone = document.getElementById("emailOrPhone").value.trim();
    users[emailOrPhone] = {
        fullName: document.getElementById("fullName").value,
        password: document.getElementById("password").value,
        dp: selectedDP
    };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup Successful!");
    window.location.href = "index.html";
}

function selectDP(img) {
    selectedDP = img.src;
}
