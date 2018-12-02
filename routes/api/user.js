// login $ register
const express = require("express");
const router = express.Router();

//加密
const bcrypt = require("bcrypt-nodejs");

//使用全球头像
const gravatar = require('gravatar');

const User = require("../../models/User");

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

module.exports = router