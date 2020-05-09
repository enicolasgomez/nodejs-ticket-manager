const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.listUsers = (req, res) => {
  User.findAll({ where: {
    roleId: 1 //only interested in non admin users
  }}).then( users => {
    res.status(200).send(JSON.stringify(users, null, 2));
  })
  .catch( error => {
    res.status(400).send
  });
};