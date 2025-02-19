// Simulating user data
const users = {
    "9876543210": { name: "John Doe", password: "password123", dp: "dp1.jpg" }
};

function checkUser() {
    let mobile = document.getElementById("mobileNumber").value;
    if (users[mobile]) {
        localStorage.setItem("currentUser", mobile);
        window.location.href = "profile.html";
    } else {
        localStorage.setItem("newUserMobile", mobile);
        window.location.href = "signup.html";
    }
}

function signupUser() {
    let name = document.getElementById("fullName").value;
    let mobile = localStorage.getItem("newUserMobile");
    let password = document.getElementById("signupPassword").value;

    users[mobile] = { name: name, password: password, dp: "dp1.jpg" };
    localStorage.setItem("currentUser", mobile);
    window.location.href = "profile.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

window.onload = function() {
    let mobile = localStorage.getItem("currentUser");
    if (mobile && users[mobile]) {
        document.getElementById("profilePic").src = users[mobile].dp;
        document.getElementById("profileName").innerText = users[mobile].name;
        document.getElementById("profileMobile").innerText = mobile;
    }
};

function updateProfile() {
    let newName = document.getElementById("editName").value;
    let mobile = localStorage.getItem("currentUser");

    if (mobile && users[mobile]) {
        users[mobile].name = newName;
        localStorage.setItem("currentUser", mobile);
        window.location.href = "profile.html";
    }
}
