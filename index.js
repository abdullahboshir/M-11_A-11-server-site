const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();


// midleWare 
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.k2n4fwj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
try{
    await client.connect();
    const serviceCollection = client.db('motoSport').collection('products');


    // service API 
    app.get('/products', async(req, res) => {
        const query = {};
        const cursor = serviceCollection.find(query);
        const porducts = await cursor.toArray();
        res.send(porducts);
    })
        // find One porducts 
        app.get('/products/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const update = await serviceCollection.findOne(query);
            res.send(update);
        });

        // Product post 
        app.post('/products', async(req, res) => {
            const newProduct = req.body;
            const result = await serviceCollection.insertOne(newProduct);
            res.send(result)
        });


        app.put('/user/:id', async (req, res) => {
          
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email
                }
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(res)
        })

        // porducts put 
        app.put('/products/:id', async(req, res) => {
            const id = req.params.id;
            const updateQuantity = req.body;
            console.log(quantity)
            const filter = {_id: ObjectId(id)};
            const options = {upsert: true};
            const updatedDoc = {
                $set: {
                    quantity: updateQuantity.updateQuan
                }
            };
            const result = await serviceCollection.updateOne(filter, updatedDoc, options);
            res.send(result) 
        });


        // delete service 
        app.delete('/products/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await serviceCollection.deleteOne(query);
            res.send(result)
        })
   
}
finally{

}
} 

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('running Moto Sport Server')
});

app.listen(port, () => {
    console.log('Listening to port', port)
});