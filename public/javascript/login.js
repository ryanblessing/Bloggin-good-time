
const loginBlock = async (e) => {
    try {
        e.preventDefault();

        const email = document.querySelector('#emailLogin').value.trim();
        const password = document.querySelector('#passwordLogin').value.trim();

        if (email && password) {
            const response = await fetch('/api/users/login', {
                method: 'post',
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        }
    } catch (error) {
        console.log(error)
    }
}


document.querySelector('.loginForm').addEventListener('submit', loginBlock);