const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");
const db = require("../db");
const User = require("./user");
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

/************************************** authenticate */

describe("authenticate", function () {
    test("works", async function () {
        const user = await User.authenticate("u1", "password1");
        expect(user).toEqual({
            username: "u1",
            email: "u1@email.com"
        });
    });

    test("unauth if no such user", async function () {
        try {
            await User.authenticate("nope", "password");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });

    test("unauth if wrong password", async function () {
        try {
            await User.authenticate("u1", "wrong");
            fail();
        } catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy();
        }
    });
});

/************************************** register */

describe("register", function () {
    const newUser = {
        username: "new",
        email: "test@test.com",
    };

    test("works", async function () {
        let user = await User.register({
            ...newUser,
            password: "password",
        });
        expect(user).toEqual(newUser);
        const found = await db.query("SELECT * FROM users WHERE username = 'new'");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
    });

    test("bad request with duplicate data", async function () {
        try {
            await User.register({
                ...newUser,
                password: "password",
            });
            await User.register({
                ...newUser,
                password: "password",
            });
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});


// /************************************** get */

describe("get", function () {
    test("works", async function () {
        let user = await User.get("u1");
        expect(user).toEqual({
            username: "u1",
            email: "u1@email.com",
            articles: [{
                "author": "Nick",
                "content": "content 1",
                "date": "7/1/21",
                "description": "desc 1",
                "id": expect.any(Number),
                "image_url": "iblah.com",
                "source": "bbc",
                "title": "article 1",
                "url": "blah.com",
            },
            {
                "author": "Nick2",
                "content": "content 2",
                "date": "7/2/21",
                "description": "desc 2",
                "id": expect.any(Number),
                "image_url": "iblah2.com",
                "source": "bbc",
                "title": "article 2",
                "url": "blah2.com",
            }
            ]
        });
    });

    test("not found if no such user", async function () {
        try {
            await User.get("nope");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});


// /************************************** remove */

describe("remove", function () {
    test("works", async function () {
        await User.remove("u1");
        const res = await db.query(
            "SELECT * FROM users WHERE username='u1'");
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such user", async function () {
        try {
            await User.remove("nope");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});
