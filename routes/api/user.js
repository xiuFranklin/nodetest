// login $ register
const express = require("express");
const router = express.Router();

//加密
const bcrypt = require("bcrypt-nodejs");

//使用全球头像
const gravatar = require('gravatar');

//jwt
const jwt = require('jsonwebtoken');

const User = require("../../models/User");
const keys = require("../../config/keys");

//passport
const passport = require("passport");

// $route GET api/users/test

// @desc 返回的请求json数据、

// @access public

router.get("/test",(req,res) => {
    res.json({msg:"login works"})
})

router.post("/register",(req,res) =>{
    // console.log(req.body)

    //查询数据库中是否拥有邮箱
    User.findOne({email: req.body.email})
        .then((user) => {
            if(user){
                return res.status(400).json({email:"邮箱已经被注册 ！"})
            }else{

                //TODO 该代码目前返回不通 mm表示一个空的头像
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

                const newUser = new User({
                    name: req.body.name,
                    email:req.body.email,
                    // 同名，如果是es6则可以省略
                    avatar,
                    password:req.body.password
                })

                // bcrypt.genSalt(10, function(err, salt) {
                //     bcrypt.hash(newUser.password, salt, function(err, hash) {
                //         // Store hash in your password DB.
                //         if(err) throw err;

                //         newUser.password = hash;
                //         newUser.save()
                //                 .then(user => res.json(user))
                //                 .catch(err => console.log(err));
                        
                //     });

                // });

                bcrypt.hash(newUser.password, null, null, function(err, hash) {
                    // Store hash in your password DB.
                            if(err) throw err;

                        newUser.password = hash;
                        newUser.save()
                                .then(user => {
                                    // console.log("*******"+user.avatar);
                                    res.json(user)})
                                .catch(err => console.log(err));
                        
                });
            }
        })
})

// 登录模块
router.post("/login",(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    //查询数据
    User.findOne({email})
        .then(user =>{
            if(!user){
                return res.status(404).json({email:"用户不存在"})
            }
            // console.log("用户存在")
            var isMathch = bcrypt.compareSync(password,user.password);
            
            if(isMathch){
                const rule = {id:user.id,name:user.name}
                //1.规则；2.加密名字；3.过期时间；4.表达式
                jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},function(err,token) {
                    if(err) throw err
                    res.json({
                        success:true,
                        token:"Bearer "+token
                    });
                })
                // res.json({msg:"success"});
            }else{
                  return res.status(400).json({password:"密码错误"});
                }
            })
})

//token验证
// 登录模块
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) =>{

    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    })
})

module.exports = router