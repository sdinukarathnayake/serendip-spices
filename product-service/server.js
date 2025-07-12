const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const app = express();
const port = process.env.PORT || 4300;

// routes files
const productRoutes = require("./routes/productRoutes");

app.use(express.json());
app.use(cors());

app.use('/products', productRoutes);

async function start() {
    try {
        await sequelize.authenticate();
        console.log('Product Database Connected.. ');
        console.log('Product Service Started..');

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