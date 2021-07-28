const express = require("express");
const API_KEY = require('../secret');
const NewsAPI = require("newsapi");
const newsAPI = new NewsAPI(`${API_KEY}`);
const router = new express.Router();
const axios = require('axios');

/** GET /  =>
 *   { user: username, email, articles: [] }
 *
 * Authorization required: user logged in
 */

router.get("/", async function (req, res, next) {

    try {
        // let articles = await newsAPI.v2.topHeadlines({ country: 'us', pageSize: 20 });
        // console.log(articles);
        let articles = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=20`, { headers: { 'X-Api-Key': `${API_KEY}` } });
        console.log(articles);
        // console.log(res);
        // return res.data.articles;
        return res.status(200).json({ articles });
    } catch (err) {
        return next(err);
    }
});


/** GET /[id]  =>  { article }
 *
 *  Article is {source, date, author, title, description, url, image_url, content }
 *  
 * Authorization required: user logged in
 */

// router.get("/:id", ensureLoggedIn, async function (req, res, next) {
//     try {
//         const article = await Article.get(req.params.id);
//         return res.status(200).json({ article });
//     } catch (err) {
//         return next(err);
//     }
// });



module.exports = router;