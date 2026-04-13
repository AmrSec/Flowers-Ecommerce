const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginMsg = document.getElementById("login-message");

if (loginForm) {
    loginForm.onsubmit = function(e) {
        e.preventDefault();
        const userInput = document.getElementById("loginUsername").value.trim();
        const passInput = document.getElementById("loginPassword").value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const found = users.find(u => (u.name === userInput || u.email === userInput) && u.password === passInput);

        if (found) {
            loginMsg.style.color = "green";
            loginMsg.innerText = "Success! Redirecting...";
            setTimeout(() => window.location.href = "home.html", 1000);
        } else {
            loginMsg.style.color = "red";
            loginMsg.innerText = "Invalid username or password.";
        }
    };
}

if (registerForm) {
    const regMsg = document.createElement("div");
    regMsg.className = "text-center text-sm font-semibold min-h-[20px] mb-2 transition-all";
    registerForm.prepend(regMsg);

    registerForm.onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();

        if (!name || !email || !password) {
            regMsg.style.color = "red";
            regMsg.innerText = "All fields are required.";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            regMsg.style.color = "red";
            regMsg.innerText = "Please enter a valid email.";
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(u => u.email === email || u.name === name)) {
            regMsg.style.color = "red";
            regMsg.innerText = "Username or email already exists.";
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        regMsg.style.color = "green";
        regMsg.innerText = "Account created successfully! Redirecting to login...";

        setTimeout(() => {
            registerForm.reset();
            regMsg.innerText = "";
            registerForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
        }, 1500);
    };
}

document.getElementById("goRegister")?.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
});

document.getElementById("goLogin")?.addEventListener("click", () => {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
});