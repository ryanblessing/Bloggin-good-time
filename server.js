const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({helpers});
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const routes = require('./routes');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//create a session attached to sequelize
const sess = {
    secret: 'secret secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

//all middleware 
app.use(session(sess))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//turn on routes to the server.
app.use(routes);

//listening to addd to the front end
sequelize.sync({
    force: true
}).then(() => {
    app.listen(PORT, () => console.log('Now Listening!!'));
});