const router = require('express').Router()

const { getCollection, ObjectId } = require('../foodtruck-db')

router.get('/menu', async (req, res) => {
    const collection = await getCollection('foodtruck-api', 'menu')
    const menu = await collection.find({}).toArray()
    response.json(menu)
})

router.get('/events', async (req, res) => {
    const collection = await getCollection('foodtruck-api', 'events')
    const events = await collection.find({}).toArray()
    response.json(events)
})

module.exports = router