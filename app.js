const express = require('express')
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
var port = process.env.PORT || 3000;
app.use(express.json());

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// connect mongodb database
require('./model/db')();

// setup view engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView : 'default',
    layoutsDir : path.join(__dirname , 'views'),
    partialsDir : path.join(__dirname, 'views/partials')
}))

// calling routes
app.use('/', require('./router/index'));

app.listen(port, () => console.log(`App is listen on${port}`));