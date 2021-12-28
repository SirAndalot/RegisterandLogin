const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getUserByID = (req, res) => {
  User.findById(req.body._id, function (err, user) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "Sucess",
      message: "contact retrieved ",
      data: user,
    })
  })
}

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 20, function (err, hashedPass) {
    console.log(hashedPass)
    if (err) {
      console.log(err)
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
    console.log(user)
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

const login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          let payload = {id : user._id, user_type_id: user.user_type_id};

      // res.status(200).header("auth-token",token).send({"token": token });

          if (result) {
            let token = jwt.sign(payload, "verySecretValue");
            res.json({
              message: "logged in",
              token,
             user: user._id
              
            });
          } 
          else {
            res.json({
              message: "password does not matched",
            });
          }
        });
      } else {
        res.json({
          message: "No user Found!",
        });
      }
    }
  );
};

const updateUser = async(req, res, next) => {
  console.log(req.params,'update');
  const user={};
    user.name = req.body ? req.body.name : user.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
const result = await User.findOneAndUpdate({_id:req.params.id},user,{new:true});
console.log(result)
return res.json(result);
}

const deleteUser = (req, res) => {
  console.log(req.body)
   User.findByIdAndDelete(req.params._id, function (err, user) {
    console.log(err)
    if (err)
      res.send(err); res.json({
        status: "success",
        message: 'Contact deleted'
      });
  });
};

module.exports = {
  getUserByID,
  register,
  login,
  updateUser,
  deleteUser,

};
