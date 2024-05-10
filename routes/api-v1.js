const router = require('express').Router()

const { getCollection, ObjectId } = require('../foodtruck-db')

//#region GET methods
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
//#endregion

//#region GET by ID methods

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
//#endregion

//#region POST Methods


//menu
router.post('/api/menu', async (req, res) => {
    // Finish this up at a later time -- @5/5/2024
    const { name, description, price } = req.body;
    const collection = await getCollection('foodtruck-api', 'menu');
    const result = await collection.insertOne({ name, description, price });
    res.json(result)
})

//events
router.post('/api/events', async (req, res) => {
    const { name, location, dates, hours } = req.body;
    const collection = await getCollection('foodtruck-api', 'events');
    const result = await collection.insertOne({ name, location, dates, hours });

    res.json(result)

})
//#endregion

//#region PUT methods

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

//#endregion


//#region DELETE methods

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
    const collection = await getCollection('foodtruck-api', 'events');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });  
    res.json(result)
});
//#endregion




module.exports = router