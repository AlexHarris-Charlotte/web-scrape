const cheerio = require('cheerio');
const request = require('request');


const scrape = {
    getNBA: function() {
        return new Promise((resolve,reject) => {
            request('http://www.espn.com/nba/', function (error, response, html) {
                const $ = cheerio.load(html);
                const results = [];

                $("h1.contentItem__title").each(function(i, element) {
                    let textContent = $(element).text();
                    results.push({
                    text: textContent
                    });
                });
                if (results) {
                    resolve(results);
                } else {
                    reject("No data");
                }
            });
        })
    }
};

module.exports = scrape;

