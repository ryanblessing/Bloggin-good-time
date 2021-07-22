//create new post
const newPost = async (e) => {
    try {
        e.preventDefault();

        const post_title = document.querySelector('input[name="post-title"]').value;
        const post_content = document.querySelector('input[name="content"]').value;

        const response = await fetch('/api/post', {
            method: 'post',
            body: JSON.stringify({
                title: post_title,
                content: post_content
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
    } catch (error) {
        console.log(error)
    }
};

//edit post
const editPost = async (e) => {
    try {
        e.preventDefault();

        const post_title = document.querySelector('input[name="post-title"]').value;
        const post_content = document.querySelector('input[name="post-content"]').value;
        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length - ``
        ];
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                post_title,
                post_content
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
    } catch (error) {
        console.log(error)
    }
};

//delete post
const deletePost = async (e) => {
    try {
        e.preventDefault();

        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length - 1
        ];

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        console.log(error)
    }
}


document.querySelector('.newPost').addEventListener('submit', newPost);
//document.querySelector('.editPost').addEventListener('submit', editPost);
//document.querySelector('.deletePost').addEventListener('click', deletePost);