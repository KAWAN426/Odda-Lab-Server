import NodeCache from 'node-cache';
import dotenv from "dotenv"
import pg from 'pg';

const { Pool } = pg
dotenv.config();

export const pool = new Pool({
  user: process.env.PG_NAME,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: 5432,
});

export const cache = new NodeCache();

export const getFromCache = (req, res, next) => {
  const key = req.originalUrl;
  const cachedData = cache.get(key);
  if (cachedData !== undefined) {
    console.log('Cache hit:', key);
    return res.send(cachedData);
  }
  console.log('Cache miss:', key);
  next();
};

export const setCache = (req, data) => {
  cache.set(req.method + req.originalUrl, data, 60000);
}