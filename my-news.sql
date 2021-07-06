DROP DATABASE my-news;
CREATE DATABASE my-news;
\connect my-news

\i my-news-schema.sql

DROP DATABASE my-news-test;
CREATE DATABASE my-news-test;
\connect my-news-test

\i my-news-schema.sql