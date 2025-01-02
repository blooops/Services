// Global constants for localStorage keys
const USERS_KEY = "users";

// Utility function to retrieve data from localStorage
function getStoredUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
}

// Utility function to store data into localStorage
function storeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Logic for index.html (Login Page)
if (document.getElementById("loginForm")) {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const identifier = document.getElementById("identifier").value;
        const users = getStoredUsers();

        if (users[identifier]) {
            localStorage.setItem("currentUser", identifier);
            window.location.href = "password.html";
        } else {
            window.location.href = "signup.html";
        }
    });
}

// Logic for password.html
if (document.getElementById("passwordForm")) {
    const currentUser = localStorage.getItem("currentUser");
    const users = getStoredUsers();

    if (currentUser && users[currentUser]) {
        document.getElementById("userName").textContent = users[currentUser].name;
        const userDp = document.getElementById("userDp");
        if (users[currentUser].profilePic) {
            userDp.src = users[currentUser].profilePic;
        } else {
            userDp.style.backgroundColor = users[currentUser].color;
            userDp.textContent = users[currentUser].name[0];
        }
    }

    const form = document.getElementById("passwordForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const password = document.getElementById("password").value;

        if (users[currentUser].password === password) {
            window.location.href = "profile.html";
        } else {
            alert("Incorrect Password");
        }
    });
}

// Logic for signup.html
if (document.getElementById("signupForm")) {
    const form = document.getElementById("signupForm");

    form.addEventListener("submit", (e) => {
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
        window.location.href = "profile.html";
    });
}

// Logic for profile.html
if (document.getElementById("profileName")) {
    const currentUser = localStorage.getItem("currentUser");
    const users = getStoredUsers();

    if (currentUser && users[currentUser]) {
        const user = users[currentUser];

        const profilePicDisplay = document.getElementById("profilePicDisplay");
        if (user.profilePic) {
            profilePicDisplay.src = user.profilePic;
        } else {
            profilePicDisplay.style.backgroundColor = user.color;
            profilePicDisplay.textContent = user.name[0];
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

// Logic for edit.html
if (document.getElementById("editForm")) {
    const currentUser = localStorage.getItem("currentUser");
    const users = getStoredUsers();

    if (currentUser && users[currentUser]) {
        const user = users[currentUser];

        document.getElementById("editFullName").value = user.name;
        document.getElementById("editDob").value = user.dob;
        document.getElementById("editMobile").value = user.mobile;
        document.getElementById("editEmail").value = user.email;

        const form = document.getElementById("editForm");
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            user.name = document.getElementById("editFullName").value;
            user.dob = document.getElementById("editDob").value;
            user.mobile = document.getElementById("editMobile").value;
            user.email = document.getElementById("editEmail").value;

            const newProfilePic = document.getElementById("editProfilePic").files[0];
            if (newProfilePic) {
                user.profilePic = URL.createObjectURL(newProfilePic);
            }

            users[currentUser] = user;
            storeUsers(users);

            window.location.href = "profile.html";
        });
    }
}
