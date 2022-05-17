const mongoose = require('mongoose');

const commonModel = require('./Common')

const commentSchema = new mongoose.Schema({
    conversation: String,
    rating: String,
    YM: String,
    content: String,
    respondent: String,
    created_at: { type: Date, default: Date.now }
});

var Comment_common = commonModel.discriminator('CommentType', commentSchema);

module.exports = Comment_common;