const data = require("./mockData.js");
const express = require("express");
const cors = require("cors");

const app = express();
const corsOption = {
    // vite application runs on port 5173
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));
app.use(express.json());
const port = 5000;

const { categories, expenses } = data;

app.get("/api/categories", (req, res) =>
{
    console.log("GET /api/categories");
    res.json(categories);
});

app.get("/api/expenses", (req, res) =>
{
    console.log("GET /api/expenses");
    res.json(expenses);
});

app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`);
});