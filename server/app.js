const express = require('express')
const config = require('config')
const {MongoClient} = require('mongodb')
const bodyParser = require("body-parser")

const numbers = require ('./routes/numbers')

const app = express()
const PORT = config.get("port") || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/numbers', numbers)

MongoClient.connect(config.get('mongoUrl'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        const db = client.db('Numbers');

        app.set("db", db);

        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "./index.html"));
        });

        app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));
    })
    .catch(err => console.log("Error connect"));




