// const { Event } = require('../db/models/Event.js');
// const express = require('express');
// const app = express.Router();

const router = require('express').Router()
const { models: { Event }} = require('../db')
module.exports = router

module.exports = router;

router.get('/', async(req, res, next) => {
  try {
    res.send(await Event.findAll());
  }
  catch(ex){
    next(ex)
  }
});

router.post('/', async(req, res, next) => {
  try {
    res.send(Event.create(req.body));
  }
  catch(ex){
    next(ex)
  }
})