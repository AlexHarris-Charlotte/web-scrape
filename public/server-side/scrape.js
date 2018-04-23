const cheerio = require('cheerio');
const request = require('request');


const scrape = {
    getArticles: function() {
        return new Promise((resolve,reject) => {
            request('https://www.nytimes.com/section/todayspaper?', function (error, response, html) {
                const $ = cheerio.load(html);
                const results = {
                    articles: []
                };
                
                // Gets a title, image, summary, and link to a NYT article and 
                // stores it in an object.
                $("div.story-body").each(function(i, element) {
                     results.articles.push({
                         title   : $(this).find($('h2.headline > a')).text() || "No Title",
                         summary : $(this).find($("p.summary")).text() || "No Summary",
                         link    : $(this).find("h2.headline > a").attr('href') || "No Link",
                         image   : $(this).find("img").attr('src') || "../assets/default.png"
                     });
                });

                if (results) {
                    // Limit the number of responses we send to be rendered
                    results.articles.splice(20);
                    resolve(results);
                } else {
                    reject("No data");
                }
            });
        });
    }
};

module.exports = scrape;

