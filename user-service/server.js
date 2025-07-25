const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const app = express();
const port = process.env.PORT || 4300;

// routes files
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

async function start() {
    try {
        await sequelize.authenticate();
        console.log('User Database Connected.. ');
        console.log('User Service Started..');

        await sequelize.sync();

        app.listen(port, () =>
            console.log(`Server on http://localhost:${port}`)
        );
    } catch (err) {
        console.error("Failed to start", err);
        process.exit(1);
    }
}

start();