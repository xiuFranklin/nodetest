// login $ register
const express = require("express");
const router = express.Router();

const Profile = require("../../models/Profile");

//passport
const passport = require("passport");

// $route GET api/users/test

// @desc 返回的请求json数据、

// @access public

router.get("/test",(req,res) => {
    console.log("in")
    res.json({msg:"login works"})
})


module.exports = router