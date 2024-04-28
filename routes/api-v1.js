const router = require('express').Router()

const { getCollection, ObjectId } = require('../foodtruck-db')

router.get('/api/menu', async (req, res) => {
    const collection = await getCollection('foodtruck-api', 'menu')
    const menu = await collection.find({}).toArray()
    response.json(menu)
})

router.get('/api/events', async (req, res) => {
    const collection = await getCollection('foodtruck-api', 'events')
    const events = await collection.find({}).toArray()
    response.json(events)
})




module.exports = router