const router = require('express').Router()

const { getCollection, ObjectId } = require('../foodtruck-db')

// get methods
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

//get by ID methods

//menu 
router.get('/api/menu/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck-api', 'events');
    const menu = await collection.findOne({ _id: new ObjectId(id) });

});
//events
router.get('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck-api', 'events');
    const event = await collection.findOne({ _id: new ObjectId(id) });

});

// post methods

//menu
router.post('/api/menu', async (request, response) => {
    const { item } = request.body;
    const collection = await getCollection('foodtruck-api', 'menu');
    const result = await collection.insertOne({ /*add stuff here */ });
});
//events
router.post('/api/events', async (request, response) => {
    const { item } = request.body;
    const collection = await getCollection('foodtruck-api', 'menu');
    const result = await collection.insertOne({ /*add stuff here */ });
});
//put methods

//menu
router.put('/api/menu/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const collection = await getCollection('foodtruck-api', 'menu');

    
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { /* add stuff here?? */}
        )

        
});

//events
router.put('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, dates, hours } = req.body;

    const collection = await getCollection('foodtruck-api', 'menu');

    
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { /* add stuff here?? */}
        )

        
});
//delete methods

//menu
router.delete('/api/menu/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck-api', 'menu');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });  
});

//events
router.delete('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck-api', 'menu');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });  
});





module.exports = router