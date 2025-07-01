const api_url = "http://localhost:4000/api/users";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("registerUser").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch(`${api_url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username,email,password}),
    });
const data = await response.json();
    if (response.ok) {
        alert("Registration successful! You can now log in.");
        registerForm.reset();
        window.location.href = "login.html";
    } else {
        alert(data.message || "Registration failed");
    }
  });
}



if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(`${api_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
   window.localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "students.html";
    } else {
      alert(data.message || "Login failed");
    }
  });
}
