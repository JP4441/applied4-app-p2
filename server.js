// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

require('dotenv').config();
const flash = require('connect-flash');

// Port Configuration
const PORT = process.env.PORT;

// Initialize Express Application
const app = express();

// look for static files here (CSS, JS, Images, Video, Audio)
app.use(express.static('public'));

const expressLayouts = require('express-ejs-layouts');

// Look into views folder for a file named as layout.ejs
app.use(expressLayouts);

let session = require('express-session');
let passport = require('./helper/ppConfig');

app.use(
  session({
    secret: process.env.secret,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 604800000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(flash());

// Sharing the information with all pages.
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

// Import Routes
// const indexRoute = require('./routes/index');
const indexRoute = require('./routes/index');
const companiesRoute = require('./routes/companies');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Mount Routes
// app.use('/', indexRoute);
app.use('/', indexRoute);
app.use('/', companiesRoute);
app.use('/', authRoutes);
app.use('/', userRoutes);

// NodeJS to look in a folder called views for all ejs files.
app.set('view engine', 'ejs');

// Connection with mongoDB
mongoose.connect(
  process.env.mongoDBURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('mongodb connected successfully!');
  }
);

app.listen(PORT, () => console.log(`App is running on ${PORT}`));

// app.get("/a", (req, res) => {
//     res.render("home/another");
// });
