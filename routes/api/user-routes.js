const router = require('express').Router();
const sequelize = require('../../config/connection');
const {
    User,
    Post,
    Comment
} = require('../../models');

// GET /api/users
router.get('/', (request, response) => {
    User.findAll({
        attributes: { exclude: ['password'] }
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
            where: {
                id: request.params.id
            }
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

// POST /api/users
router.post('/', (request, response) => {
    User.create({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    })
    .then(dbUserData => response.json(dbUserData))
    .catch(err => {
        console.log(err);
        response.status(500).json(err)
    })
});

// PUT /api/users/1
router.put('/:id', (request, response) => {
    User.update(request.body, {
        where: {
            id: request.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            response.status(400).json({ message: 'No User found with this id!'})
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
        if(!dbUserData) {
            response.status(404).json({ message: 'No User found with this Id! '})
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