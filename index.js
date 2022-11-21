const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ztnz7id.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const activitiesCollection = client.db('peoplefoundation').collection('activities');

        app.get('/activities', async (req, res) => {
            const query = {};
            const cursor = activitiesCollection.find(query);
            console.log(cursor)
            const activities = await cursor.toArray();
            console.log(activities)
            res.send(activities);
        })

        app.post('/activities', async (req, res) => {
            const newActivity = req.body;
            console.log(newActivity)
            const result = await activitiesCollection.insertOne(newActivity);
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(console.dir)



// Running Node
app.get('/', (req, res) => {
    res.send('Helping people foundation Server running')
})

app.listen(port, () => {
    console.log('HPFServer running properly at ----', port)
})