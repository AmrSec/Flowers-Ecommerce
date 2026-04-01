const loginForm = document.querySelector(".form.login");
const registerForm = document.querySelector(".form.register");

const goRegister = document.getElementById("goRegister");
const goLogin = document.getElementById("goLogin");

function showRegister() {
  loginForm.classList.remove("active");

  // delay بسيط عشان animation يبان
  setTimeout(() => {
    registerForm.classList.add("active");
  }, 10);
}

function showLogin() {
  registerForm.classList.remove("active");

  setTimeout(() => {
    loginForm.classList.add("active");
  }, 10);
}

goRegister.addEventListener("click", showRegister);
goLogin.addEventListener("click", showLogin);

// ========================
// Switch Forms
// ========================
const loginFormUI = document.querySelector(".form.login");
const registerFormUI = document.querySelector(".form.register");

document.getElementById("goRegister").addEventListener("click", () => {
  loginFormUI.classList.remove("active");
  registerFormUI.classList.add("active");
});

document.getElementById("goLogin").addEventListener("click", () => {
  registerFormUI.classList.remove("active");
  loginFormUI.classList.add("active");
});

// ========================
// Helpers
// ========================
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function isValidEmail(email) {
  // بسيط وسهل
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(pass) {
  // على الأقل 6 حروف
  return pass.length >= 6;
}

// ========================
// Register
// ========================
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim().toLowerCase();
  const password = document.getElementById("regPassword").value;

  // Validation
  if (name.length < 3) {
    alert("Name must be at least 3 characters");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email");
    return;
  }

  if (!isValidPassword(password)) {
    alert("Password must be at least 6 characters");
    return;
  }

  let users = getUsers();

  // check if email already exists
  const exists = users.find(u => u.email === email);
  if (exists) {
    alert("This email is already registered!");
    return;
  }

  // create user
  const newUser = {
    id: Date.now(),
    name,
    email,
    password // ملاحظة: في الواقع ماينفعش نخزن باسورد كده، بس للمشروع OK
  };

  users.push(newUser);
  saveUsers(users);

  alert("Account created successfully ✅ Now login!");

  // بعد التسجيل يروح للوجين
  registerFormUI.classList.remove("active");
  loginFormUI.classList.add("active");

  // clear inputs
  this.reset();
});

// ========================
// Login
// ========================
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  if (username === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  const users = getUsers();

  // login by email OR name (مرن)
  const user = users.find(u =>
    (u.email === username.toLowerCase() || u.name.toLowerCase() === username.toLowerCase())
    && u.password === password
  );

  if (!user) {
    alert("Invalid username/email or password ❌");
    return;
  }

  // session storage = current login
  sessionStorage.setItem("currentUser", JSON.stringify(user));

  // remember me = save current user in localStorage (اختياري)
  if (rememberMe) {
    localStorage.setItem("rememberUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("rememberUser");
  }

  alert();

  // مثال: توديها لصفحة home
  // window.location.href = "home.html";

  this.reset();
});

// ========================
// Auto Login if remembered
// ========================
window.addEventListener("load", () => {
  const remembered = localStorage.getItem("rememberUser");
  if (remembered) {
    sessionStorage.setItem("currentUser", remembered);
    const user = JSON.parse(remembered);
    console.log("Auto login as:", user.name);
  }
});

// ========================
// Logout (Function جاهزة)
// ========================
function logout() {
  // يمسح session فقط
  sessionStorage.removeItem("currentUser");

  // لو عايزة كمان يخرج من remember me
  // localStorage.removeItem("rememberUser");

  alert("Logged out successfully 👋");
}

// علشان تناديها من زرار:
window.logout = logout;
