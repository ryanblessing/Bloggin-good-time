const router = require('express').Router();

const { Comment } = require('../../models');

//comment get routes for all routes
router.get('/', (request, response) => {
    Comment.findAll()
        .then(dbCommentData => response.json(dbCommentData))
        .catch(err => {
            console.log(err);
            response.status(500).json(err)
        })
})

//post routes for comments
router.post('/', (request, response) => {
    if (request.session) {
        Comment.create({
                comment_text: request.body.comment_text,
                user_id: request.session.user_id,
                post_id: request.body.post_id
            })
            .then(dbCommentData => response.json(dbCommentData))
            .catch(err => {
                console.log(err);
                response.status(500).json(err)
            })
    }
})

//comment delete routes
router.delete('/:id', (request, response) => {
    Comment.destroy({
            where: {
                id: request.params.id
            }
        })
        .then(dbCommentData => {
            if (!dbCommentData) {
                response.status(404).json({
                    message: 'No comment was found!'
                })
                return;
            }
            response.json(dbCommentData)
        })
        .catch(err => {
            console.log(err);
            response.status(500).json(err)
        })
})

module.exports = router;