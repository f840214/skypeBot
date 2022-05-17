const express = require('express');

const router = express.Router();
const Channel_common = require("../db/schema/Channel_common");

const {
    checkUser
  } = require('../helper/auth');

// get 特殊條件 channel
// get 全部 channel
router.get("/", (req, res) => {
    Channel_common.find(req.query, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(data);
        }
    });
});

// 創建渠道
router.post("/", (req, res) => {
    let {
        skypeName,
        conversation
    } = req.body;
    if (skypeName && conversation) {
        Channel_common.findOne({conversation},(err,channel)=>{
            if(err){
                console.log(err);
                res.status(500).send(err);
            } else {
                if (channel){
                    res.send('重複的渠道conversation，請確認是否重複創建');
                }else{
                    Channel_common.create({
                        skypeName,
                        conversation
                    }, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send(err);
                        } else {
                            res.json(`Have created Channel ${data.skypeName}`);
                        }
                    });
                }
            }
        })
    } else {
        res.json("參數不能為空白");
    }
});

// 更新，更新status
router.put("/", checkUser, (req, res) => {
    let {
        _id
    } = req.body;
    let request = {
        active: req.body.active,
        skypeName: req.body.skypeName,
        conversation: req.body.conversation
    };
    if (_id) {
        Channel_common.findByIdAndUpdate(
            _id, request, (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.json(`Have update Channel ${data.skypeName}`);
                }
            });
    } else {
        res.status(200).send("id 不能為空白");
    }
});

router.delete("/", checkUser, (req, res) => {
    let {
        _id
    } = req.query;
    if (_id) {
        Channel_common.findByIdAndDelete(
            _id, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.json(`Have deleted Channel`);
                }
            });
    } else {
        res.status(200).send("id 不能為空白");
    }
});

module.exports = router;