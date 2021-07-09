const db = require("../db.js");
const { NotFoundError } = require("../expressError");
const Article = require("./article");
const User = require('./user');
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** save */

describe("save", function () {
    const newArticle = {
        username: 'u2',
        source: 'bbc',
        date: 'today',
        author: 'Nick',
        title: 'article1',
        description: 'desc1',
        url: 'url1.com',
        image_url: 'imgurl1.com',
        content: 'content1'
    };

    test("works", async function () {
        let article = await Article.save(newArticle);
        expect(article).toEqual(
            {
                id: expect.any(Number),
                source: 'bbc',
                date: 'today',
                author: 'Nick',
                title: 'article1',
                description: 'desc1',
                url: 'url1.com',
                image_url: 'imgurl1.com',
                content: 'content1'
            }
        );

        const result = await db.query(
            `SELECT source, date, author, title, description, url, image_url, content
           FROM articles
           WHERE username = 'u2'`);
        expect(result.rows).toEqual([
            {
                author: "Nick3",
                content: "content 3",
                date: "7/3/21",
                description: "desc 3",
                image_url: "iblah3.com",
                source: "bbc",
                title: "article 3",
                url: "blah3.com",

            },
            {
                source: 'bbc',
                date: 'today',
                author: 'Nick',
                title: 'article1',
                description: 'desc1',
                url: 'url1.com',
                image_url: 'imgurl1.com',
                content: 'content1'
            }
        ]);
    });
});


// /************************************** get */

describe("get", function () {
    test("works", async function () {
        let user = await User.get('u2');
        let artId = user.articles[0].id;
        let article = await Article.get(artId);
        expect(article).toEqual(
            {
                author: "Nick3",
                content: "content 3",
                date: "7/3/21",
                description: "desc 3",
                image_url: "iblah3.com",
                source: "bbc",
                title: "article 3",
                url: "blah3.com",

            }
        );
    });

    test("not found if no such article", async function () {
        try {
            await Article.get(234123123);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});


// /************************************** remove */

describe("remove", function () {
    test("works", async function () {
        let id = await db.query(`SELECT id FROM articles WHERE username = 'u2'`);
        await Article.remove(id.rows[0].id);
        const res = await db.query(
            "SELECT id FROM articles WHERE username = 'u2'");
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such article", async function () {
        try {
            await Article.remove(234123123);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});
