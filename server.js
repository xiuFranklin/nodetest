const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//引入users.js
const users = require("./routes/api/user")


// DB config
const db = require("./config/keys").mongoURI;

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(db)
        .then(() => console.log("mongonDB connected"))
        .catch(err => console.log(err))

app.get("/",(req,res) =>{
    res.send("hello world !");
})

// 使用routes
app.use("/api/users",users)

const port = process.env.port || 5000

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})