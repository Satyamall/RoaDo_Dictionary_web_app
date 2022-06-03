
const mongoose = require("mongoose");

const DictionarySchema = new mongoose.Schema({
    word:{type: String},
    definitions:{type: String},
    examples:{type: String},
    shortDefinitions:{type: String},
    subsense:{type: String},
})

const Dictionary = mongoose.model("words",DictionarySchema);

module.exports = Dictionary;