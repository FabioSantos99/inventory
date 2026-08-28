import "../css/login.css";

const BASE_URL = "http://localhost:3000";

const loginBtn = document.querySelector("#login-btn");
const loginError = document.querySelector("#login-error");

if(localStorage.getItem("token")) {
    window.location.replace("/index.html");
}

loginBtn.addEventListener("click", async () => {
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (!username || !password) {
        showError("Preenca todos os campos");
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/auth/login`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            showError(data.error || "Erro ao fazer login.");
            return
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", data.username);

        window.location.replace("/index.html");;

    } catch {
        showError("Servidor indisponível. Tente novamente.");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") loginBtn.click();
});

function showError(msg) {
    loginError.textContent = msg;
    loginError.style.display = "block";
}