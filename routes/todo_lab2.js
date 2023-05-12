const express = require('express');
const router = express.Router();
const { connect, ObjectId } = require('../databases/mongodb');

router.get('/', async (req, res) => {
  try {
    const db = await connect();
    const query = req.query;
    const todos = await db.collection('todos').find(query).toArray();
    res.send(todos);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get('/:_id', async (req, res) => {
  try {
    const db = await connect();
    const { _id } = req.params;
    const todo = await db.collection('todos').findOne({ _id: new ObjectId(_id) });
    res.send(todo);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.put('/:_id', async (req, res) => {
  try {
    const db = await connect();
    const { _id } = req.params;
    const validKeys = ['title', 'description', 'isDone'];
    const todoPatch = validKeys.reduce((acc, key) => {
      if (req.body[key] !== undefined) {
        acc[key] = req.body[key];
      }
      return acc;
    }, {});
    await db.collection('todos').updateOne({ _id: new ObjectId(_id) }, { $set: todoPatch });
    res.status(200).send({ ...todoPatch, _id });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.post('/', async (req, res) => {
  try {
    const db = await connect();
    const { title, description } = req.body;
    const todo = { title, description, isDone: false };
    const { insertedId } = await db.collection('todos').insertOne(todo);
    res.status(201).send({ ...todo, _id: insertedId });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.delete('/:_id', async (req, res) => {
  try {
    const db = await connect();
    const { _id } = req.params;
    await db.collection('todos').deleteOne({ _id: new ObjectId(_id) });
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.delete('/', async (req, res) => {
  try {
    const db = await connect();
    await db.collection('todos').deleteMany({});
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
