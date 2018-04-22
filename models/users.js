const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/web-scrape");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
const usersCollection = new Schema({
    userName: {
        type: String, 
        required: 'User name required'
    },
    password: {
        type: String, 
        required: 'Password required'
    },
    email: {
        type: String, 
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
});

const usersModel = mongoose.model("users", usersCollection)

module.exports = usersModel;