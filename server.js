// const path = require('path');
const express = require('express');
const routes = require('./routes');
//const sessions = require('express-session');
//const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
//const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;


//all middleware 
app.use(session(sess))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//turn on routes to the server.
app.use(routes);


//listening to addd to the front end
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening!!'));
});

