const request = require("supertest");
const app = require("../app");
const User = require('../models/user');

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u2Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /articles */

describe("GET /articles", function () {
    test("works with logged in user", async function () {

        const resp = await request(app).get("/articles").set('authorization', `${u2Token}`);
        expect(resp.body).toEqual({
            articles: [
                {
                    "id": expect.any(Number),
                    "source": "bbc3",
                    "date": '3/3/2023',
                    "author": "author 3",
                    "title": "title 3",
                    "description": "Desc3",
                    "url": "bbc3.com",
                    "image_url": "img3.com",
                    "content": "content 3 here"
                }
            ]
        });
    });

    test("doesn't work with non logged in user", async function () {
        const resp = await request(app).get("/articles");
        expect(resp.statusCode).toEqual(401);
    });

});

/************************************** POST /articles */

describe("POST /articles", function () {
    test("works for logged in user", async function () {
        const resp = await request(app)
            .post("/articles")
            .send({
                username: "u2",
                source: "bbc4",
                date: '4/4/2024',
                author: "author 4",
                title: "title 4",
                description: "Desc4",
                url: "bbc4.com",
                image_url: "img4.com",
                content: "content 4 here"
            }).set('authorization', `${u2Token}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            article: {
                id: expect.any(Number),
                source: "bbc4",
                date: '4/4/2024',
                author: "author 4",
                title: "title 4",
                description: "Desc4",
                url: "bbc4.com",
                image_url: "img4.com",
                content: "content 4 here"
            }
        });
        let res = await User.get('u2');
        expect(res.articles.length).toEqual(2);
    });


    test("bad request with missing fields", async function () {
        const resp = await request(app)
            .post("/articles")
            .send({
                source: "bbc4",
                date: '4/4/2024',
                author: "author 4",
                description: "Desc4",
                url: "bbc4.com",
                image_url: "img4.com",
                content: "content 4 here"
            }).set('authorization', `${u2Token}`);
        expect(resp.statusCode).toEqual(400);
    });

    test("does not work for non logged in user", async function () {
        const resp = await request(app)
            .post("/articles")
            .send({
                username: "u2",
                source: "bbc4",
                date: '4/4/2024',
                author: "author 4",
                title: "title 4",
                description: "Desc4",
                url: "bbc4.com",
                image_url: "img4.com",
                content: "content 4 here"
            });
        expect(resp.statusCode).toEqual(401);
    });
});

/************************************** GET /articles/:id */

describe("GET /articles/:id", function () {
    test("works for logged in user", async function () {
        let user = await request(app).get("/articles").set('authorization', `${u2Token}`);
        let artId = user.body.articles[0].id;
        const resp = await request(app)
            .get(`/articles/${artId}`).set('authorization', `${u2Token}`);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            article:
            {
                "source": "bbc3",
                "date": '3/3/2023',
                "author": "author 3",
                "title": "title 3",
                "description": "Desc3",
                "url": "bbc3.com",
                "image_url": "img3.com",
                "content": "content 3 here"
            }
        });
    });

    test("doesn't work for non logged in user", async function () {
        let user = await request(app).get("/articles").set('authorization', `${u2Token}`);
        let artId = user.body.articles[0].id;
        const resp = await request(app)
            .get(`/articles/${artId}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("bad request with invalid id", async function () {
        const resp = await request(app)
            .get(`/articles/20000`).set('authorization', `${u2Token}`);
        expect(resp.statusCode).toEqual(404);
    });
});
/************************************** DELETE /articles/:id */

describe("DELETE /articles/:id", function () {
    test("works for logged in user", async function () {
        let user = await request(app).get("/articles").set('authorization', `${u2Token}`);
        let artId = user.body.articles[0].id;
        const resp = await request(app)
            .delete(`/articles/${artId}`).set('authorization', `${u2Token}`);
        expect(resp.statusCode).toEqual(200);
        user = await request(app).get("/articles").set('authorization', `${u2Token}`);
        expect(user.body.articles.length).toEqual(0);
    });

    test("doesn't work with non logged in user", async function () {
        let user = await request(app).get("/articles").set('authorization', `${u2Token}`);
        let artId = user.body.articles[0].id;
        const resp = await request(app)
            .delete(`/articles/${artId}`);
        expect(resp.statusCode).toEqual(401);
        user = await request(app).get("/articles").set('authorization', `${u2Token}`);
        expect(user.body.articles.length).toEqual(1);
    });

    test("doesn't work with invalid id", async function () {
        const resp = await request(app)
            .delete(`/articles/20000`).set('authorization', `${u2Token}`);
        expect(resp.statusCode).toEqual(404);
    });
});
