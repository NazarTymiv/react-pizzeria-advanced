import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import clientRoutes from "./routes/client.js";

// DATA IMPORTS
import Product from "./models/Product.js";
import { listOfPizzas } from "./data/index.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/client", clientRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server has been started on PORT: ${PORT}`);

            // Product.insertMany(listOfPizzas);
        });
    })
    .catch((err) => console.log(`${err} did not connect`));
