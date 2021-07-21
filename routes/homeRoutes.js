const router = require('express').Router();
const {
    response
} = require('express');
const {
    Post,
    User,
    Comment
} = require('../models');

router.get('/', (request, response) => {
    console.log(request.session)
    Post.findAll({
            attributes: [
                'id', 'content', 'title', 'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            //pass a single post object into the homepage
            const posts = dbPostData.map(post => post.get({
                plain: true
            }))
            response.render('homepage', {
                posts,
                loggedIn: request.session.loggedIn
            });
        })
        .catch(err => {
            console.log('Failed to get posts');
            response.status(500).json(err);
        })
});

//sign up route
router.get('/signup', (request, response) => {
    if (request.session.signup) {
        response.redirect('/');
        return;
    }
    response.render('signup')
});

// //sign up post route
// router.post('/signup', (request, response) => {
//     if (username && password && email) {
//         user = User.FindOne({
//             username: username
//         })
//         if (user == null) {
//             var data = request.body
//             User.Create(data).then(user => {
//                 request.session.user = user
//                 response.status(200)
//                 return response.redirect('/dashboard')
//             })
//         } else {
//             console.log('Shit!!!!')
//         }
//     }
// })



//login route
router.get('/login', (request, response) => {
    if (request.session.loggedIn) {
        response.redirect('/');
        return;
    }
    response.render('login')
});

router.get('/post/:id', (request, response) => {
    Post.findOne({
            where: {
                id: request.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                response.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }

            // serialize the data
            const post = dbPostData.get({
                plain: true
            });

            // pass data to template
            response.render('single-post', {
                post,
                loggedIn: request.session.loggedIn
            });
        })
        .catch(err => {
            console.log('failed to get post');
            response.status(500).json(err);
        });
})

module.exports = router;