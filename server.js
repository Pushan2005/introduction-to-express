const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));

const itemSchema = new mongoose.Schema({
    name: String,
});

const Item = mongoose.model("Item", itemSchema);

// Create
app.post("/api/items", (req, res) => {
    const newItem = new Item(req.body);
    newItem
        .save()
        .then((item) => res.json(item))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Read
app.get("/api/items", (req, res) => {
    Item.find()
        .then((items) => res.json(items))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Update
app.put("/api/items/:id", (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((item) => res.json(item))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Delete
app.delete("/api/items/:id", (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: true }))
        .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
