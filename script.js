// Utility functions for localStorage
const USERS_KEY = "users";

function getStoredUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
}

function storeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Handle Login
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const identifier = document.getElementById("identifier").value;
        const users = getStoredUsers();

        if (users[identifier]) {
            localStorage.setItem("currentUser", identifier);
            window.location.href = "password.html";
        } else {
            alert("User not registered. Redirecting to Sign Up...");
            window.location.href = "signup.html";
        }
    });
}

// Handle Password Verification
if (document.getElementById("passwordForm")) {
    const currentUser = localStorage.getItem("currentUser");
    const users = getStoredUsers();

    if (currentUser && users[currentUser]) {
        document.getElementById("userName").textContent = users[currentUser].name;

        document.getElementById("passwordForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const password = document.getElementById("password").value;

            if (users[currentUser].password === password) {
                alert("Login successful! Redirecting...");
                window.location.href = "https://abc.xyz";
            } else {
                alert("Incorrect password!");
            }
        });
    }
}

// Handle Profile Display
if (document.getElementById("profileName")) {
    const currentUser = localStorage.getItem("currentUser");
    const users = getStoredUsers();

    if (currentUser && users[currentUser]) {
        const user = users[currentUser];
        const profileDp = document.getElementById("profileDp");

        if (user.profilePic) {
            profileDp.style.backgroundImage = `url(${user.profilePic})`;
            profileDp.style.backgroundSize = "cover";
        } else {
            profileDp.textContent = user.name[0].toUpperCase();
            profileDp.style.backgroundColor = user.color;
        }

        document.getElementById("profileName").textContent = `Name: ${user.name}`;
        document.getElementById("profileEmail").textContent = `Email: ${user.email}`;
        document.getElementById("profileMobile").textContent = `Mobile: ${user.mobile}`;
    }

    document.getElementById("editProfile").addEventListener("click", () => {
        window.location.href = "edit.html";
    });

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
    });
}

// Handle Signup
if (document.getElementById("signupForm")) {
    document.getElementById("signupForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const users = getStoredUsers();

        const profilePic = document.getElementById("profilePic").files[0];
        const fullName = document.getElementById("fullName").value;
        const dob = document.getElementById("dob").value;
        const mobile = document.getElementById("mobile").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("signupPassword").value;

        const identifier = email || mobile;

        const user = {
            name: fullName,
            dob,
            mobile,
            email,
            password,
            profilePic: profilePic ? URL.createObjectURL(profilePic) : null,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
        };

        users[identifier] = user;
        storeUsers(users);

        localStorage.setItem("currentUser", identifier);
        alert("Sign up successful! Redirecting to profile...");
        window.location.href = "profile.html";
    });
}
