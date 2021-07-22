const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET /api/users
router.get('/', (request, response) => {
    User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        .then(dbUserData => response.json(dbUserData))
        .catch(err => {
            console.log(err);
            response.status(500).json(err)
        })
});

// GET /api/users/1
router.get('/:id', (request, response) => {
    User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: request.params.id
            },
            include: [{
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_at']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                }
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                response.status(404).json({
                    message: 'No User found with this Id!'
                })
                return;
            }
            response.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            response.status(500).json(err)
        })
});

// POST routes for login and logout and new user
router.post('/signup', (request, response) => {
    User.create({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password
        })
        .then(dbUserData => {
            console.log('user data', dbUserData)
            request.session.save(() => {
                request.session.user_id = dbUserData.id;
                request.session.username = dbUserData.username;
                request.session.loggedIn = true;

                response.json(dbUserData);
            })
        })
        .catch(err => {
            console.log('Create error', err);
            response.status(500).json(err)
        })
});

//post log in
router.post('/login', (request, response) => {
    User.findOne({
        where: {
            email: request.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            response.status(400).json({
                message: 'Can not find a user id with a email address!'
            })
            return;
        }

        const passwordValidate = dbUserData.passwordCheck(request.body.password)

        if (!passwordValidate) {
            response.status(400).json({
                message: 'Password incorrect'
            })
            return;
        }

        request.session.save(() => {
            request.session.user_id = dbUserData.id;
            request.session.username = dbUserData.username;
            request.session.loggedIn = true;

            response.json({
                user: dbUserData,
                message: 'Congrats, your logged in, Enjoy!'
            })
        })
    }).catch(err => {
        console.log(err);
        response.status(500).json(err)
    });
});

//post route to logout
router.post('/logout', (request, response) => {
    if(request.session.loggedIn) {
        request.session.destroy(() => {
            response.status(200).end();
        }); 
    } else {
        response.status(404).end();
    }
})

// PUT /api/users/1
router.put('/:id', (request, response) => {
    User.update(request.body, {
        individualHooks: true,
            where: {
                id: request.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                response.status(400).json({
                    message: 'No User found with this id!'
                })
                return;
            }
            response.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            response.status(500).json(err)
        })
});

// DELETE /api/users/1
router.delete('/:id', (request, response) => {
    User.destroy({
            where: {
                id: request.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                response.status(404).json({
                    message: 'No User found with this Id! '
                })
                return;
            }
            response.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json(err)
        })
});

module.exports = router;