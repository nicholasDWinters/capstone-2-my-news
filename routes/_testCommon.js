const db = require("../db");
const User = require("../models/user");
const Article = require("../models/article");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {

    await db.query("DELETE FROM users");
    await db.query("DELETE FROM articles");


    await User.register({
        username: "u1",
        email: "user1@user.com",
        password: "password1"

    });
    await User.register({
        username: "u2",
        email: "user2@user.com",
        password: "password2"

    });
    await User.register({
        username: "u3",
        email: "user3@user.com",
        password: "password3"

    });

    await Article.save(
        {
            username: "u1",
            source: "bbc1",
            date: '1/1/2021',
            author: "author 1",
            title: "title 1",
            description: "Desc1",
            url: "bbc1.com",
            image_url: "img1.com",
            content: "content 1 here"
        });
    await Article.save(
        {
            username: "u1",
            source: "bbc2",
            date: '2/2/2022',
            author: "author 2",
            title: "title 2",
            description: "Desc2",
            url: "bbc2.com",
            image_url: "img2.com",
            content: "content 2 here"
        });
    await Article.save(
        {
            username: "u2",
            source: "bbc3",
            date: '3/3/2023',
            author: "author 3",
            title: "title 3",
            description: "Desc3",
            url: "bbc3.com",
            image_url: "img3.com",
            content: "content 3 here"
        });

}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}


const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });
const u3Token = createToken({ username: "u3" });


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    u3Token
};
