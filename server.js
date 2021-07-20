const path = require('path');
const express = require('express');
const routes = require('./routes');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({helpers});
const session = require('express-session');
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

const app = express();
const PORT = process.env.PORT || 3001;

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
    force: false
}).then(() => {
    app.listen(PORT, () => console.log('Now Listening!!'));
});