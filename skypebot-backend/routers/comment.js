const express = require('express');

const router = express.Router();
const Comment_common = require("../db/schema/Comment_common");

const {
    checkUser
  } = require('../helper/auth');

// get 參數列表 YM conversation
router.get("/", (req, res) => {
    Comment_common.find(req.query, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.json(data);
        }
    });
});

// 創建 comment
router.post("/", (req, res) => {
    let {
        conversation,
        rating,
        YM,
        content,
        respondent
    } = req.body;
    if (conversation && rating && YM && content && respondent) {
        Comment_common.create({
            conversation,
            rating,
            YM,
            content,
            respondent
        }, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.json(`Have created comment.`);
            }
        });
    } else {
        res.json("參數不能為空白");
    }
});

// 刪除
router.delete("/", checkUser, (req, res) => {
    let {
        _id
    } = req.query;
    if (_id) {
        Comment_common.findByIdAndDelete(
            _id, (err, query) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.json(`Have deleted Comment id ${query._id}`);
                }
            });
    } else {
        res.json("id 不能為空白");
    }
});

module.exports = router;