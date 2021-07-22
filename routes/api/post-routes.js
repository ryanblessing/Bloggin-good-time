const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// get all users route
router.get('/', (request, response) => {
    Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
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
        .then(dbPostData => response.json(dbPostData))
        .catch(err => {
            console.log('Could not get a post');
            response.status(500).json(err)
        });
});

// get route to find one post
router.get('/:id', (request, response) => {
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
                    message: 'No post found!'
                })
                return;
            }
            response.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json(err)
        })
})

//post routes 
router.post('/', (request, response) => {
    console.log('post request body!!!!',request.body)
    Post.create({
            title: request.body.title,
            content: request.body.content,
            user_id: request.session.user_id
        })
        .then(dbPostData => response.json(dbPostData))
        .catch(err => {
            console.log(err);
            response.status(500).json(err)
        })
})

//put route 
router.put('/:id', (request, response) => {
    Post.update({
            title: request.body.title,
            content: request.body.content
        }, {
            where: {
                id: request.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                response.status(404).json({
                    message: 'No Post found!'
                })
                return;
            }
            response.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json(err)
        })
})

//destroy route
router.delete('/:id', (request, response) => {
    Post.destroy({
            where: {
                id: request.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                response.status(404).json({
                    message: 'No post found'
                })
                return;
            }
            response.json(dbPostData)
        })
        .catch(err => {
            console.log(err);
            response.status(500).json(err)
        })
})


module.exports = router;