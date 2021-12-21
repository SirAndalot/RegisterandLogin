const express = require("express");
const app = express();
const userRoute= require('./router/userRoute');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/UserLogin');
var db = mongoose.connection;
if (!db)
console.log ("Error connecting db")
else
console.log ("Db conneced sucessfully")

app.use(express.json());
app.use('/api',userRoute)

app.get("/api", (req, res) => res.send("its working!"));

app.listen(3000, function () {
  console.log("It is running");
});


