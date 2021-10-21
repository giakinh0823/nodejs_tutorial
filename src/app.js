const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const  methodOverride = require('method-override')
const path = require('path');
const sortMiddleware = require('./app/middlewares/SortMiddleware'); 

//database
const db = require('./config/db');

const app = express();
const port = 3000;

//middleware
app.use(
  express.urlencoded({
    extended: true,
  }),
); // Nhận dữ liệu từ form
app.use(express.json()); // Nhận dữ liệu từ code javascript
app.use(methodOverride('_method'))

//custom middleware
app.use(sortMiddleware)

//static
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    helpers: require('./helpers/handlebars')
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// connect database
db.connect();

// connect
//route
const route = require('./routes');
route(app);

// Listion port
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
