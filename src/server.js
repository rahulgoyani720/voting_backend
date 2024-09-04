const express = require("express");
const app = express();
const CONFIG = require("./configs/config");
const bodyParser = require('body-parser');
const allRouter = require("./routers/router");


const connectiondb = require("./configs/connection");

connectiondb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res) => {
    res.status(201).send("welcome to home page");
});


app.use("/api",allRouter);

app.listen(CONFIG.port,() => {
    console.log(`server is running in ${CONFIG.port}`);

})

