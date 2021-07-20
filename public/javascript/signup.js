//create a new account
const newAccount = async (e) => {
    try {
        e.preventDefault();

        const username = document.querySelector('#usernameSignup').value.trim();
        const email = document.querySelector('#emailSignUp').value.trim();
        const password = document.querySelector('#passwordSignup').value.trim();

        if (username && password && email) {
            const response = await fetch('/api/users', {
                method: 'post',
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText)
            }
        }
    } catch (error) {
        console.log(error)

    }
}

document.querySelector('.signupForm').addEventListener('submit', newAccount);