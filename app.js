const express = require('express');
const cors = require('cors');
const { NotFoundError } = require('./expressError');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
// const headlinesRoutes = require('./routes/headlines');
const { authenticateJWT } = require('./middleware/auth');

const app = express();


app.use(cors());
// app.use(function (req, res, next) {
//     // CORS headers

//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

//     if (req.method === "OPTIONS") {
//         return res.status(200).end();
//     }

//     return next();
// })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authenticateJWT);
// app.use('/headlines', headlinesRoutes);
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;