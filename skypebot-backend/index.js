const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const uuidv4 = require('uuid/v4');

const env = require('dotenv').config('./');

// 驗證系統
const session = require('express-session');

// 資料庫 schema
const announceRouter = require('./routers/announce');
const channelRouter = require('./routers/channel');
const commentRouter = require('./routers/comment');
const userRouter = require('./routers/user');
const satisfyRouter = require('./routers/satisfy');

// mongoose 設定
const db =require('./helper/db')
db.connect(process.env);


// meddleware
app.use(express.json());
app.use(cors());
app.use(session({
  genid: (req) => {
    return uuidv4() 
  },
  secret: 'skype bot secret key',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 86400000 }
}));

// router
// backend

app.use(express.static("./build"));

// announce
app.use("/api/announce", announceRouter)

// channel
app.use("/api/channel", channelRouter)

// commit
app.use("/api/comment", commentRouter)

// user
app.use("/api/user", userRouter)

// satisfy frontend
app.use("/satisfy", satisfyRouter)


// error handle
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(port, '0.0.0.0', () => console.log(`server is preparing at PORT ${port}...`));