const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn } = require("../middleware/auth");
const Article = require("../models/article");
const User = require('../models/user');
const articleNewSchema = require("../schemas/articleNew.json");


const router = new express.Router();


/** POST / { article } =>  { article }
 *
 * adds an article to user's saved read list
 * article should be { username, source, date, author, title, description, url, image_url, content }
 *
 * Returns { source, date, author, title, description, url, image_url, content }
 *
 * Authorization required: logged in user
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, articleNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const article = await Article.save(req.body);
        return res.status(201).json({ article });
    } catch (err) {
        return next(err);
    }
});

/** GET /  =>
 *   { user: username, email, articles: [] }
 *
 * Authorization required: user logged in
 */

router.get("/", ensureLoggedIn, async function (req, res, next) {

    try {
        const user = await User.get(res.locals.user.username || localStorage.user);
        console.log(user);
        return res.json({ user });
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

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        const article = await Article.get(req.params.id);
        return res.json({ article });
    } catch (err) {
        return next(err);
    }
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization: logged in user
 */

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
        await Article.remove(req.params.id);

        return res.json({ deleted: req.params.id });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;