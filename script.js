document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const loginSection = document.getElementById("loginSection");
  const passwordSection = document.getElementById("passwordSection");
  const signupSection = document.getElementById("signupSection");
  const profileSection = document.getElementById("profileSection");
  const editSection = document.getElementById("editSection");

  const userData = JSON.parse(localStorage.getItem("userData")) || {};

  function showSection(section) {
    [...app.children].forEach(child => child.classList.add("hidden"));
    section.classList.remove("hidden");
  }

  if (userData.loggedIn) {
    showSection(profileSection);
    loadProfile(userData);
  } else {
    showSection(loginSection);
  }

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const identifier = document.getElementById("loginIdentifier").value;
    if (identifier === userData.email || identifier === userData.mobile) {
      showSection(passwordSection);
      document.getElementById("passwordName").textContent = userData.fullName;
    } else {
      showSection(signupSection);
    }
  });

  document.getElementById("passwordForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const password = document.getElementById("loginPassword").value;
    if (password === userData.password) {
      userData.loggedIn = true;
      localStorage.setItem("userData", JSON.stringify(userData));
      showSection(profileSection);
      loadProfile(userData);
    } else {
      alert("Incorrect password");
    }
  });

  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("signupFullName").value;
    const dob = document.getElementById("signupDob").value;
    const mobile = document.getElementById("signupMobile").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const profilePic = document.getElementById("signupProfilePic").files[0];

    userData.fullName = fullName;
    userData.dob = dob;
    userData.mobile = mobile;
    userData.email = email;
    userData.password = password;

    if (profilePic) {
      const reader = new FileReader();
      reader.onload = () => {
        userData.profilePic = reader.result;
        saveUserData();
        showSection(profileSection);
        loadProfile(userData);
      };
      reader.readAsDataURL(profilePic);
    } else {
      userData.profilePic = null;
      saveUserData();
      showSection(profileSection);
      loadProfile(userData);
    }
  });

  document.getElementById("editProfile").addEventListener("click", () => {
    showSection(editSection);
    document.getElementById("editFullName").value = userData.fullName;
    document.getElementById("editDob").value = userData.dob;
    document.getElementById("editMobile").value = userData.mobile;
    document.getElementById("editEmail").value = userData.email;
  });

  document.getElementById("editForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("editFullName").value;
    const dob = document.getElementById("editDob").value;
    const mobile = document.getElementById("editMobile").value;
    const email = document.getElementById("editEmail").value;
    const profilePic = document.getElementById("editProfilePic").files[0];

    userData.fullName = fullName;
    userData.dob = dob;
    userData.mobile = mobile;
    userData.email = email;

    if (profilePic) {
      const reader = new FileReader();
      reader.onload = () => {
        userData.profilePic = reader.result;
        saveUserData();
        showSection(profileSection);
        loadProfile(userData);
      };
      reader.readAsDataURL(profilePic);
    } else {
      saveUserData();
      showSection(profileSection);
      loadProfile(userData);
    }
  });

  document.getElementById("logout").addEventListener("click", () => {
    userData.loggedIn = false;
    localStorage.setItem("userData", JSON.stringify(userData));
    showSection(loginSection);
  });

  function saveUserData() {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  function loadProfile(data) {
    document.getElementById("profileDp").style.backgroundImage = data.profilePic
      ? `url(${data.profilePic})`
      : "";
    document.getElementById("profileName").textContent = data.fullName;
    document.getElementById("profileEmail").textContent = data.email;
    document.getElementById("profileMobile").textContent = data.mobile;
  }
});
