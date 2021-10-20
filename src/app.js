const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
var methodOverride = require('method-override')
const path = require('path');

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

//static
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    helpers: {
      sum: (a,b) => a+b,
      formatDate: (value) => value ? new Date(value).toLocaleString(): new Date().toLocaleString()
    }
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
