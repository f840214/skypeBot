const mongoose = require('mongoose');

const commonModel = require('./Common')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    created_at: { type: Date, default: Date.now }
});

var Comment_common = commonModel.discriminator('UserType', userSchema);

module.exports = Comment_common;