const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const app = express();
const port = process.env.PORT;

// routes files
const cartRoutes = require("./routes/cartRoutes");

app.use(express.json());
app.use(cors());

app.use('/cart', cartRoutes);


async function start() {
    try {
        await sequelize.authenticate();
        console.log("Database connected..");

        await sequelize.sync({ alter: true });

        app.listen(port, () =>
            console.log(`Server on http://localhost:${port}`)
        );
    } catch (err) {
        console.error("Failed to start", err);
        process.exit(1);
    }
}

start();