const router = require('express').Router()

const { getCollection, ObjectId } = require('../foodtruck-db')

// get methods
router.get('/api/menu', async (req, res) => {
    const collection = await getCollection('foodtruck-api', 'menu')
    const menu = await collection.find({}).toArray()
    res.json(menu)
})

router.get('/api/events', async (req, res) => {
    const collection = await getCollection('foodtruck-api', 'events')
    const events = await collection.find({}).toArray()
    res.json(events)
})

//get by ID methods

//menu 
router.get('/api/menu/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck-api', 'menu');
    const menu = await collection.findOne({ "_id": new ObjectId(id) });
    res.json(menu)
})

//events
router.get('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck-api', 'events');
    const events = await collection.findOne({ _id: new ObjectId(id) });
    res.json(events)
})

// post methods

//menu
router.post('/api/menu', async (req, res) => {
    // Finish this up at a later time -- @5/5/2024
    const { item } = req.body;
    const collection = await getCollection('foodtruck-api', 'menu');
    const result = await collection.insertOne({ _id : new ObjectId,
                                                name : "test",
                                                description : "test",
                                                price : "1.99" });
    res.json(result)
})

//events
router.post('/api/events', async (req, res) => {
    const { item } = req.body;
    const collection = await getCollection('foodtruck-api', 'events');
    const result = await collection.insertOne({ _id : new ObjectId,
                                                name : "test",
                                                location : "test",
                                                dates : "test",
                                                hours : "test"});
    res.json(result)

})

//put methods

//menu
router.put('/api/menu/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const collection = await getCollection('foodtruck-api', 'menu');
    const events = await collection.findOne({ _id: new ObjectId(id) });

    
        const result = await collection.updateOne(
            {_id : new ObjectId(id)},
            {
                $set : {
                    name : "tessssst",
                    description: "tessssst",
                    price: "3.99"
                }
            }
           
        )
        
        res.json(result)
        
})

//events
router.put('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, dates, hours } = req.body;

    const collection = await getCollection('foodtruck-api', 'events');
    const events = await collection.findOne({ _id: new ObjectId(id) });

    
        const result = await collection.updateOne(
            {_id : new ObjectId(id)},
            {
                $set : {
                    name : "Plover Pizza Place",
                    location : "Plover",
                    dates : "July 15, 2024",
                    hours : "10am - 4pm"
                }
            }
           
        )
        
        res.json(result)
        
});
//delete methods

//menu
router.delete('/api/menu/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck-api', 'menu');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });  
    res.json(result) /* not sure if this is entirely correct --> along with the stuff below code */
});

//events
router.delete('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    const collection = await getCollection('foodtruck-api', 'menu');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });  
    res.json(result)
});





module.exports = router