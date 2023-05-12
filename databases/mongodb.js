const { MongoClient, ObjectId } = require('mongodb');
const util = require('util');

const DB_NAME = `${process.env.DB_NAME}`;
const DB_HOSTS = `${process.env.DB_HOST}`;
const DB_USER = `${process.env.DB_USER}`;
const DB_PASS = `${process.env.DB_PASSWORD}`;

const url = util.format('mongodb://%s:%s@%s/', DB_USER, DB_PASS, DB_HOSTS);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'lab2'
};
const client = new MongoClient(url, options);
let db = null;

/**
 * @function connect - подключиться к базе данных MongoDB
 * @returns {Promise<Db>} db - подключение к базе данных
 */
const connect = async () => {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      console.log('reconnecting database');
      await client.connect();
      db = client.db(`${process.env.DB_NAME_USE}`);
    } else {
      console.log('db is already connected');
    }
    return db;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  connect,
  ObjectId,
  client
};
