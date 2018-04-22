const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/web-scrape');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
const ArticleSchema = new Schema({
    title: {type: String, default: 'No Title'},
    summary: {type: String, default: 'No Summary'},
    link: {type: String, default: 'No Link'},
    image: {type: String, default: 'No Image'},
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

const Article = mongoose.model('articles', ArticleSchema)

module.exports = Article;

