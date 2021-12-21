const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.password,10,function (err, hashedPass) {
    if (err) {
      res.json({
        error: err
      })
    }

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPass
    })
    user
      .save()
      .then(user => {
        res.json({
          message: "User added"
        })
      })
      .catch(error => {
        res.json({
          message: "error"
        })
      })
  })
}
module.exports = {
  register
}
