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

router.post("/add",passport.authenticate("jwt",{session:false}),(req,res) => {
    
    const profileFiels = {};
    if(req.body.type) profileFiels.type = req.body.type;
    if(req.body.describe) profileFiels.describe = req.body.describe;
    if(req.body.income) profileFiels.income = req.body.income;
    if(req.body.expend) profileFiels.expend = req.body.expend;
    if(req.body.cash) profileFiels.cash = req.body.cash;
    if(req.body.remark) profileFiels.remark = req.body.remark;

    new Profile(profileFiels).save().then(profile => {
        res.json(profile)
    })
})

//获取所有信息
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {

    Profile.find()
          .then(profile => {
              if(! profile){
                  return res.status(404).json("没有任何内容")
              }

              res.json(profile)
          })
          .catch(err => res.status(404).json(err)); 

})

//获取单个信息
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {

    Profile.findOne({_id:req.params.id})
          .then(profile => {
              if(! profile){
                  return res.status(404).json("没有任何内容")
              }

              res.json(profile)
          })
          .catch(err => res.status(404).json(err)); 

})


module.exports = router