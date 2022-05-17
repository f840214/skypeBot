const express = require('express');

const router = express.Router()
const User_common = require("../db/schema/User_common");

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const {
    checkUser,
    checkAdmin
} = require('../helper/auth');

// get 使用者列表
router.get("/", /*checkUser,*/ (req, res) => {
    User_common.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            userList = data.map((user) => {
                user.password = undefined;
                user._type = undefined;
                user.__v = undefined;
                return user;
            })
            res.json(userList);
        }
    })
});

// 登入
router.post("/login", (req, res) => {
    console.log(req.session.username)
    // 如果有session，則驗證session
    if (req.session.username) {
        let username = req.session.username;
        let role = req.session.role;
        let _id = req.session._id;
        res.json({
            username,
            role,
            _id
        });
    } else if (!req.session.view) {
        // 首次進入網頁
        req.session.view = true;
        res.send('歡迎進入');
    } else {
        // 沒有 session 則查詢資料庫。
        let {
            username,
            password
        } = req.body;
        // 撈 user 資料庫
        User_common.findOne({
            username
        }, (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                // 找不到用戶
                if (!user) {
                    // 不是第一次進入網頁
                    res.send('找不到使用者');
                } else {
                    // 核對密碼
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (err) {
                            res.send(err);
                        } else if (!result) {
                            res.status(200).send('密碼錯誤');
                        } else {
                            // 建立session
                            req.session.username = user.username;
                            req.session.role = user.role;
                            req.session._id = user._id
                            res.json({
                                username: user.username,
                                role: user.role,
                                _id: user._id
                            });
                        }
                    });
                }
            }
        })
    }
});

// 創建用戶
router.post("/", /*checkAdmin,*/ (req, res) => {
    let {
        username,
        role
    } = req.body;
    if (!username && !role) {
        res.send('缺少參數');
    } else {
        User_common.findOne({
            username
        }, (err, user) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else if (!user) {
                let password = "111111";
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        User_common.create({
                            username,
                            password: hash,
                            role
                        }, err => {
                            if (err) {
                                console.log(err);
                                res.send(err);
                            } else {
                                res.send('已經新增使用者');
                            }
                        })
                    });
                });
            } else {
                res.send('重複的使用者名');
            }
        })
    }
})
// 刪除用戶
router.delete("/", /*checkAdmin,*/ (req, res) => {
    let {
        _id
    } = req.query;
    if (_id) {
        User_common.findByIdAndDelete(_id, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send(`Have delete user ${_id} `);
            }
        });
    } else {
        res.status(200).send("id 不能為空白");
    }
});

// 修改密碼
router.put("/", /*checkAdmin,*/ (req, res) => {
    let {
        _id
    } = req.query;
    if (_id) {
        User_common.findByIdAndUpdate(_id, req.body,(err, user) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send(`Have delete user ${_id} `);
            }
        });
    } else {
        res.status(200).send("id 不能為空白");
    }
})

// 登出
router.delete("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(`Have logged out `);
        }
    })
})

module.exports = router;