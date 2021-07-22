const router = require('express').Router();
const {
    Post,
    User,
    Comment
} = require('../models');

router.get('/', (request, response) => {
    console.log('dashboard endpoint', request.session.user_id)
    Post.findAll({
            where: {
                // use the ID from the session
                user_id: request.session.user_id
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
            console.log('', dbPostData)
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({
                plain: true
            }));
            response.render('dashboard', {
                posts,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log('failed to get posts', err);
            response.status(500).json(err);
        });
});

router.get('/edit/:id', (request, response) => {
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
            response.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log('failed to edit posts');
            response.status(500).json(err);
        });
})

module.exports = router;