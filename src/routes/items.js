const express = require("express");
const itemSchema = require("../models/items.js");

const router = express.Router();

// get pastels

router.post("/item", (req, res) => {
    console.log(req.body, "asd")
    const item = itemSchema(req.body);
    item
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/items", (req, res) => {
    itemSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/item/:id", (req, res) => {
    const { id } = req.params;
    itemSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;