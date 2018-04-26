const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/web-scrape");

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
const usersSchema = new Schema({
    userName: String,
    googleId: String,
    articles: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

const usersModel = mongoose.model("user", usersSchema);

module.exports = usersModel;