const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mgnjc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)

async function run() {
    try{
        await client.connect();
        console.log('database cannected')
        const serviceCollection = client.db('doctors_portal2').collection('services');

        app.get('/service', async(req,res) =>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req,res) =>{
    res.send('Doctors portal')
});
app.listen(port, () =>{
    console.log(`this is port ${port}`)
})