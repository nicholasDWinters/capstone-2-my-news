const db = require("../db");
const { NotFoundError } = require("../expressError");

class Article {
    /** Save an article (from data), update db, return article data.
     *
     * data should be { username, source, date, author, title, description, url, image_url, content }
     *
     * Returns { source, date, author, title, description, url, imageUrl, content }
     *
     * */

    static async save({ username, source, date, author, title, description, url, image_url, content }) {

        const result = await db.query(
            `INSERT INTO articles
           (username, source, date, author, title, description, url, image_url, content)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING id, source, date, author, title, description, url, image_url, content`,
            [
                username, source, date, author, title, description, url, image_url, content
            ],
        );
        const article = result.rows[0];

        return article;
    }
    /** get given article from database
 *
 * Throws NotFoundError if article not found.
 **/

    static async get(id) {
        const article = await db.query(`SELECT source, date, author, title, description, url, image_url, content 
            FROM articles WHERE id = $1`, [id]);
        if (!article.rows[0]) throw new NotFoundError('Article not found');

        return article.rows[0];
    }


    /** Delete given article from database; returns undefined.
     *
     * Throws NotFoundError if article not found.
     **/

    static async remove(id) {
        console.log(id);
        const article = await db.query('SELECT id FROM articles WHERE id = $1', [id]);
        if (!article.rows[0]) throw new NotFoundError('Article not found');
        const result = await db.query(
            `DELETE
           FROM articles
           WHERE id = $1
           RETURNING id`,
            [id]);
        return result.rows[0];
    }
}


module.exports = Article;
