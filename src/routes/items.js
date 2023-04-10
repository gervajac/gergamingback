const express = require("express");
const itemSchema = require("../models/items.js");

const router = express.Router();

// get pastels

router.post("/item", (req, res) => {
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

router.get("/itemsp", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "price";
    let category = req.query.category || "all";

    const categoryOptions = [
      "perifericos",
      "teclado",
      "gpu",
      "cpu",
      "ssd",
      "ram",
      "motherboard",
    ];

    category === "all"
      ? (category = [...categoryOptions])
      : (category = req.query.category.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const items = await itemSchema
      .find({ name: { $regex: search, $options: "i" } })
      .where("category")
      .in([...category])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await itemSchema.countDocuments({
      category: { $in: [...category] },
      name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      categories: categoryOptions,
      items,
    };

    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "internal server error" });
  }
});

router.get("/item/:id", (req, res) => {
  const { id } = req.params;
  itemSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
