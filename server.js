const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//passport
const passport = require("passport");

//引入users.js
const users = require("./routes/api/user")

// 引入profile
const profiles = require("./routes/api/profile")


// DB config
const db = require("./config/keys").mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


mongoose.connect(db)
        .then(() => console.log("mongonDB connected"))
        .catch(err => console.log(err))

//passport
app.use(passport.initialize());

//传递给passport.js,模块分离
require("./config/passport")(passport)

app.get("/",(req,res) =>{
    res.send("hello world !");
})

// 使用routes
app.use("/api/users",users)
app.use("/api/profile",profiles)

const port = process.env.port || 5000

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})