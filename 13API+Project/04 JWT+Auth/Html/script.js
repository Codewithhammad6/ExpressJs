const API_URL='http://localhost:4000/api/users';


const loginForm =document.querySelector('#loginForm');
const registerForm =document.querySelector('#registerForm');

if(registerForm){
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();


        const username = document.querySelector('#registerUser').value;
        const email = document.querySelector('#registerEmail').value;
        const password = document.querySelector('#registerPassword').value;


const res =await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

const data= await res.json();

        if (res.ok) {
            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html';
        } else {
            alert(`Error: ${data.message}`);
        }
    })};



    if(loginForm) { 
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.querySelector('#loginUser').value;
            const password = document.querySelector('#loginPassword').value;

            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = 'students.html';
            } else {
                alert(`Error: ${data.message}  || Login failed!`);
            }
        });
    }