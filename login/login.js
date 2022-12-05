let usernameInput = document.querySelector('#username-input');
let passwordInput = document.querySelector('#password-input')

let submitButton = document.querySelector('#submit-button')

submitButton.addEventListener('click', (e) => {

    const loginData = {
        'username': usernameInput.value,
        'password': passwordInput.value
    }

    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(loginData)
    })
        .then(response => {

            if (response.status === 401) {
                alert("Wrong credentials! Try once again.")
                return
            }

            if (response.ok) {
                let token;

                for (let pair of response.headers.entries()) {
                    if (pair[0] === 'authorization') {
                        token = pair[1]
                    }
                }

                if (token) {
                    localStorage.setItem('jwtToken', token)
                    window.location.replace("../main/main.html");
                }
            }
        })
})