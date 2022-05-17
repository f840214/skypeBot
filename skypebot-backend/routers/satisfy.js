const express = require('express');
const uuidv4 = require('uuid/v4'); 
const router = express.Router();

router.get('/' ,(req,res)=>{
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let id = uuidv4().split('-');
    let quesNum = id[2];
    let secNum = id[3];
    res.render('./index.ejs', {...req.query, ip, quesNum, secNum })
})

module.exports = router;
