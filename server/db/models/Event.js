const db = require('../db');
const { Sequelize } = db;
const { STRING, DATE } = Sequelize;

const Event = db.define('events', {
    start: {
      type: DATE
    },
    end: {
      type: DATE
    },
    title: {
      type: STRING
    }
});

module.exports = Event;

