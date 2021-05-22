const express = require('express')
const app = express()
const port = process.env.PORT || 5055
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

// console.log(process.env.DB_USER)

app.use(cors());
app.use(bodyParser.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.id4k2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const userCollection = client.db("dashboarddb").collection("users");
  console.log("database connected")
  //   client.close();
  app.get('/users', (req,res) => {
    userCollection.find()
    .toArray((err, users) => {
     console.log(err)
      res.send(users)
    })
  })
});

app.get('/', function (req, res) {
  res.send('hello world')
})



app.listen(port, ()=> console.log("listening")
)