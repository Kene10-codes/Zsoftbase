const express = require("express");
const app = express();
const authURLs = require("./api/auth");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true}, () => console.log("Database is connected!"));

app.use(express.json());
app.use(cors());
app.use("/api/auth", authURLs);

app.listen(3000, () => {
    console.log("server is running fine!");
})


