// Utility function to save data to localStorage
function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Utility function to retrieve data from localStorage
function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Redirect to password.html if user is already logged in
window.onload = () => {
    const loggedInUser = getData("loggedInUser");
    if (loggedInUser) {
        window.location.href = "password.html";
    }
};

// Index.html: Login functionality
if (document.querySelector("#loginForm")) {
    document.querySelector("#loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const identifier = document.querySelector("#identifier").value;
        const users = getData("users") || [];
        const user = users.find(
            (user) => user.email === identifier || user.mobile === identifier
        );

        if (user) {
            saveData("currentUser", user);
            window.location.href = "password.html";
        } else {
            alert("User not registered. Redirecting to signup...");
            window.location.href = "signup.html";
        }
    });
}

// Password.html: Password validation
if (document.querySelector("#passwordForm")) {
    const currentUser = getData("currentUser");
    if (!currentUser) {
        window.location.href = "index.html";
    } else {
        document.querySelector("#userName").textContent = currentUser.fullName;

        document
            .querySelector("#passwordForm")
            .addEventListener("submit", (e) => {
                e.preventDefault();
                const password = document.querySelector("#password").value;

                if (password === currentUser.password) {
                    saveData("loggedInUser", currentUser);
                    window.location.href = "profile.html";
                } else {
                    alert("Incorrect password!");
                }
            });
    }
}

// Signup.html: Signup functionality
if (document.querySelector("#signupForm")) {
    document.querySelector("#signupForm").addEventListener("submit", (e) => {
        e.preventDefault();

        const profilePic = document.querySelector("#profilePic").files[0];
        const fullName = document.querySelector("#fullName").value;
        const dob = document.querySelector("#dob").value;
        const mobile = document.querySelector("#mobile").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#signupPassword").value;

        const users = getData("users") || [];
        const existingUser = users.find(
            (user) => user.email === email || user.mobile === mobile
        );

        if (existingUser) {
            alert("User already registered!");
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            const profilePicUrl = profilePic ? reader.result : null;
            const newUser = {
                profilePic: profilePicUrl,
                fullName,
                dob,
                mobile,
                email,
                password,
            };

            users.push(newUser);
            saveData("users", users);
            saveData("currentUser", newUser);
            alert("Signup successful!");
            window.location.href = "profile.html";
        };

        if (profilePic) {
            reader.readAsDataURL(profilePic);
        } else {
            reader.onload();
        }
    });
}

// Profile.html: Display user details
if (document.querySelector(".profile-box")) {
    const loggedInUser = getData("loggedInUser");

    if (!loggedInUser) {
        window.location.href = "index.html";
    } else {
        const profileDp = document.querySelector("#profileDp");
        const profileName = document.querySelector("#profileName");
        const profileEmail = document.querySelector("#profileEmail");
        const profileMobile = document.querySelector("#profileMobile");

        if (loggedInUser.profilePic) {
            profileDp.style.backgroundImage = `url(${loggedInUser.profilePic})`;
            profileDp.style.backgroundSize = "cover";
        } else {
            const initials = loggedInUser.fullName
                .split(" ")
                .map((n) => n[0])
                .join("");
            profileDp.textContent = initials;
            profileDp.style.backgroundColor = `#${Math.floor(
                Math.random() * 16777215
            ).toString(16)}`;
        }

        profileName.textContent = loggedInUser.fullName;
        profileEmail.textContent = loggedInUser.email;
        profileMobile.textContent = loggedInUser.mobile;

        document.querySelector("#editProfile").addEventListener("click", () => {
            window.location.href = "edit.html";
        });

        document.querySelector("#logout").addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.href = "index.html";
        });
    }
}

// Edit.html: Edit user details
if (document.querySelector("#editForm")) {
    const loggedInUser = getData("loggedInUser");

    if (!loggedInUser) {
        window.location.href = "index.html";
    } else {
        document.querySelector("#editFullName").value = loggedInUser.fullName;
        document.querySelector("#editDob").value = loggedInUser.dob;
        document.querySelector("#editMobile").value = loggedInUser.mobile;
        document.querySelector("#editEmail").value = loggedInUser.email;

        document
            .querySelector("#editForm")
            .addEventListener("submit", (e) => {
                e.preventDefault();

                const profilePic = document.querySelector("#editProfilePic").files[0];
                const fullName = document.querySelector("#editFullName").value;
                const dob = document.querySelector("#editDob").value;
                const mobile = document.querySelector("#editMobile").value;
                const email = document.querySelector("#editEmail").value;

                const reader = new FileReader();
                reader.onload = function () {
                    const profilePicUrl = profilePic ? reader.result : loggedInUser.profilePic;
                    const updatedUser = {
                        profilePic: profilePicUrl,
                        fullName,
                        dob,
                        mobile,
                        email,
                        password: loggedInUser.password,
                    };

                    const users = getData("users");
                    const userIndex = users.findIndex(
                        (user) => user.email === loggedInUser.email
                    );

                    users[userIndex] = updatedUser;
                    saveData("users", users);
                    saveData("loggedInUser", updatedUser);
                    alert("Profile updated successfully!");
                    window.location.href = "profile.html";
                };

                if (profilePic) {
                    reader.readAsDataURL(profilePic);
                } else {
                    reader.onload();
                }
            });
    }
}
