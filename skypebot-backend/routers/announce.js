const express = require('express');

const router = express.Router()
const Announce_common = require("../db/schema/Announce_common");

const {
  checkUser
} = require('../helper/auth');

// 更改
router.get("/", (req, res) => {
  let {
    _id,
    next
  } = req.query;
  // 撈取排定維護
  if (next) {
    return Announce_common.findOne({
      type: "排定維護"
    }, {}, {
      sort: {
        created_at: -1
      }
    }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.json(data);
      }
    });
    // 用id撈取撈取
  } else if (_id) {
    return Announce_common.findById(_id, (err, announce) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else if (!announce) {
        res.send('找不到data');
      } else {
        res.json(announce);
      }
    })
  } else {
    Announce_common.find({}, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.json(data);
      }
    });
  }
});


router.post("/", checkUser, (req, res) => {
  let {
    title,
    detail,
    username,
    type
  } = req.body;
  // 必須要有這些參數才能創立
  if (title && detail && username && type) {
    Announce_common.create({
      title,
      detail,
      username,
      type
    }, (err, announce) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(announce);
      }
    });
  } else {
    res.send("創建參數不能為空白");
  }
});

// 更改，依 id 刪除
router.delete("/", checkUser, (req, res) => {
  let {
    _id
  } = req.query;
  if (_id) {
    Announce_common.findByIdAndDelete(_id, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(`Have delete announce ${_id}`);
      }
    });
  } else {
    res.send("id 不能為空白");
  }
});

// 更新，依id更新
router.put("/", checkUser, (req, res) => {
  let {
    _id,
    title,
    detail,
    username,
    type
  } = req.body;
  if (_id) {
    Announce_common.findByIdAndUpdate(_id, {
      title,
      detail,
      username,
      type,
      updated_at: new Date().toISOString()
    }, (err, announce) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.send(announce);
      }
    });
  } else {
    res.json("id 不能為空白");
  }
});

module.exports = router;