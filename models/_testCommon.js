const bcrypt = require("bcrypt");

const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function commonBeforeAll() {
    // noinspection SqlWithoutWhere
    await db.query("DELETE FROM articles");
    // noinspection SqlWithoutWhere
    await db.query("DELETE FROM users");

    await db.query(`
        INSERT INTO users(username,
                          password,
                          email)
        VALUES ('u1', $1, 'u1@email.com'), ('u2', $2, 'u2@email.com')
        RETURNING username`,
        [
            await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
            await bcrypt.hash("password2", BCRYPT_WORK_FACTOR)
        ]);

    await db.query(`
    INSERT INTO articles(username, source, date, author, title, description, url, image_url, content)
    VALUES ('u1', 'bbc', '7/1/21', 'Nick', 'article 1', 'desc 1', 'blah.com', 'iblah.com', 'content 1'),
    ('u1', 'bbc', '7/2/21', 'Nick2', 'article 2', 'desc 2', 'blah2.com', 'iblah2.com', 'content 2'),
    ('u2', 'bbc', '7/3/21', 'Nick3', 'article 3', 'desc 3', 'blah3.com', 'iblah3.com', 'content 3')`);

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


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
};