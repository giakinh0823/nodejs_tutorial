const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

//middleware
app.use(
  express.urlencoded({
    extended: true,
  }),
); // Nhận dữ liệu từ form
app.use(express.json()); // Nhận dữ liệu từ code javascript

//static
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

//route
const route = require('./routes');
route(app);

// Listion port
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
