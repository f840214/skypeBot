const mongoose = require('mongoose');

const commonModel = require('./Common')

const announceSchema = new mongoose.Schema({
    title: String,    
    detail: String,
    type: String,
    username: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

var Announce_common = commonModel.discriminator('AnnounceType', announceSchema);

module.exports = Announce_common;