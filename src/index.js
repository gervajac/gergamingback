const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const itemRoutes = require("./routes/items.js");


const port = process.env.PORT || 9000;

//middleware

app.use(cors())
app.use(express.json())
app.use('/api', itemRoutes);

app.get('/', (req, res) => {
    res.send("welcome to my api")
});

//mongodb connection

mongoose.connect(process.env.MONGODB_GERVA)
.then(() => console.log("connected to mongodb atlas"))
.catch((error) => console.error(error));

app.listen(port, () => console.log("server listening on port", port));