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

app.put('/api/categories/:id', (req, res) =>
{
    console.log("PUT /api/categories/:id");
    const updatedCategory = req.body;
    const orgCategory = categories.find(c => c.id == req.params.id);
    if (!orgCategory || orgCategory.id != updatedCategory.id)
    {
        res.status(404).send("Category not found");
        return;
    }
    orgCategory.name = updatedCategory.name;
    orgCategory.budget = updatedCategory.budget;
    console.log(orgCategory);
    res.status(200).json(orgCategory);
})

app.get("/api/expenses", (req, res) =>
{
    console.log("GET /api/expenses");
    res.json(expenses);
});

app.post("/api/expenses", (req, res) =>
{
    console.log("POST /api/expenses");
    const newExpense = req.body;
    newExpense.id = expenses.length + 1;
    console.log(newExpense);
    expenses.push(newExpense);
    res.status(201).json(newExpense);
    // res.status(202);
});

app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`);
});