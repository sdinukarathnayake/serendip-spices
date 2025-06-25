// Loads environment variables from a .env file into process.env
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Cross-Origin Resource Sharing (so API can be called from other domains).

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function start() {
    app.listen(port, () =>
        console.log(`Server running on http://localhost:${port}`)
    );
}

start().catch(err => {
    console.error(err);
    process.exit(1);
});