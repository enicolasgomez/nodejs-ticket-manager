const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var bcrypt = require("bcryptjs");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role ;
const User = db.user ;

db.sequelize.sync({ force: true })
.then(() => {
  console.log('Database & tables created!')
  //default roles and admin user chained insert
  Role.create({
    name: 'user'
  })
  .then(r => {
    User.create({
      username: 'user',
      email: 'user@user.com',
      password: bcrypt.hashSync('user', 8),
      roleId: r.id
    })
    .then(user => {
      console.log("User and default roles registered successfully!");
    })
    .catch(err => {
      console.log(err.message);
    });
    Role.create({
      name: 'admin'
    }).then( r => {
      User.create({
        username: 'admin',
        email: 'enicolasgomez@gmail.com',
        password: bcrypt.hashSync('admin', 8),
        roleId: r.id
      })
      .then(user => {
        console.log("User and default roles registered successfully!");
      })
      .catch(err => {
        console.log(err.message);
      });
    })
    .catch(err => {
      console.log(err.message);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/ticket.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});