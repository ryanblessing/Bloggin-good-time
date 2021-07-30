
//create a new account
const newAccount = async (e) => {
    try {
        e.preventDefault();

        const username = document.querySelector('#usernameSignup').value.trim();
        const email = document.querySelector('#emailSignup').value.trim();
        const password = document.querySelector('#passwordSignup').value.trim();

        if (username && password && email) {
            const response = await fetch('/api/user/signup', {
                method: 'POST',
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
                document.location.replace('/homepage');
            } else {
                alert('still not working, check signup.js')
            }

        }
    } catch (error) {
        console.log(error)

    }
}

document.querySelector('.signupForm').addEventListener('submit', newAccount);