const dotenv = require("dotenv");
dotenv.config();
const router = require('./src/router/router');
const express = require('express');
const app = express();
const connectToDb = require("./src/database/connection");
app.use(express.json());
connectToDb();
app.use('/app', router);

app.get('/ping', (req, res) => {
    res.json({
        status: 200, 
        message: "pong"
    })
})

app.listen(3000, () => {
    console.log("sever started on 3000");
})