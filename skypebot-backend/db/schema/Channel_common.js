const mongoose = require('mongoose');

const commonModel = require('./Common')

const channelSchema = new mongoose.Schema({
    skypeName: String,
    conversation: String,
    active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

var Channel_commmon = commonModel.discriminator('ChannelType', channelSchema);

module.exports = Channel_commmon;