'use strict'

const {db, models: {User, Event} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  const events = await Promise.all([
    Event.create({ start: '2022-09-10', end: '2022-09-14', title: 'hello world' }),
    Event.create({ start: '2022-09-25', end: '2022-09-25', title: 'hello world2' })
  ])

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', firstName: 'cody', password: '123' }),
    User.create({ username: 'murphy', firstName: 'murphy', password: '123' }),
    User.create({ username: 'moe', firstName: 'moe', password: '123' }),
    User.create({ username: 'lucy', firstName: 'lucy', password: '123' })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      moe: users[2],
      lucy: users[3]
    },
    events: {
      event1: events[0],
      event2: events[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
