const express = require("express");
const { API_KEY } = require('../config');
const router = new express.Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(API_KEY, { corsProxyUrl: 'https://thingproxy.freeboard.io/fetch/' });

/** GET /  =>
 *   { gets top headlines from our api }
 *
 */

router.get("/", async function (req, res, next) {

    try {
        // if (req.method === "OPTIONS") {
        //     res.header('Access-Control-Allow-Origin', 'https://agonizing-bag.surge.sh/');
        //     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        //     res.header('Access-Control-Allow-Headers', 'authorization,x-api-key');
        //     res.status(200);
        //     return next();
        // }
        console.log(API_KEY);
        let data = await newsapi.v2.topHeadlines({ country: 'us', pageSize: 20 });
        console.log(data);
        // let res2 = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=20`, { headers: { 'X-Api-Key': `${API_KEY}` } });

        // let articles = res2.data;

        // return res.data.articles;
        // return res.status(200).json({ articles });
        return res.status(200).json({ data });
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

router.get("/:topic", async function (req, res, next) {

    try {
        // let articles = await newsAPI.v2.topHeadlines({ country: 'us', pageSize: 20 });
        // console.log(articles);

        // let res2 = await axios.get(`https://newsapi.org/v2/everything?q=${req.params.topic}&pageSize=20&sortBy=relevancy`, { headers: { 'X-Api-Key': `${API_KEY}` } });

        // let articles = res2.data;
        let data = await newsapi.v2.everything({ q: `${req.params.topic}`, pageSize: 20, sortBy: 'relevancy' });

        console.log(data);
        // return res.data.articles;
        // return res.status(200).json({ articles });
        return res.status(200).json({ data });
    } catch (err) {
        return next(err);
    }
});



module.exports = router;