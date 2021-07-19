const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')
const dashboardRoutes = require('./dashboardRoute');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes)


router.use((request, response) => {
    response.status(404).end();
});

module.exports = router;