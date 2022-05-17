const mongoose = require('mongoose');

const baseConfig = {
    discriminatorKey: "_type", //If you've got a lot of different data types, you could also consider setting up a secondary index here.
    collection: "skypebot"   //Name of the Common Collection
};

const commonModel = mongoose.model('Common', new mongoose.Schema({}, baseConfig));

module.exports = commonModel