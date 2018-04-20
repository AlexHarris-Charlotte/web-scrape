const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
const webScrape = new Schema({
    title: {type: String, default: 'No Title'},
    summary: {type: String, defalut: 'No Summary'},
    link: {type: String, defalut: 'No Link'},
    image: {type: String, defalut: 'No Image'}
});

const webScrapeModel = mongoose.model("webScrape", webScrape)

module.exports = webScrapeModel;