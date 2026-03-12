const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

// REMOVE the < and > brackets
const MONGO_URL = "mongodb+srv://Userairbnb:coding123@air.7zj2qsv.mongodb.net/airbnb?retryWrites=true&w=majority";


let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
  .then(client => {
    _db = client.db('airbnb');
    callback();
  }).catch(err => {
    console.log('Error while connecting to Mongo: ', err);
  });
}

const getDB = () => {
  if (!_db) {
    throw new Error('Mongo not connected');
  }
  return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
