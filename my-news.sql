DROP DATABASE my_news;
CREATE DATABASE my_news;
\connect my_news

\i my-news-schema.sql

DROP DATABASE my_news_test;
CREATE DATABASE my_news_test;
\connect my_news_test

\i my-news-schema.sql