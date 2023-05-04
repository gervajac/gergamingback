const express = require("express");
const router = express.Router();
const checkoutSchema = require("../models/checkout.js")

router.post("/posted", (req, res) => {
    const check = checkoutSchema(req.body)

    check
    .save()
    .then((data, message) => res.json({data, payVerified: true}))
    .catch((error) => res.json({ message: error }));
  });

  router.get("/payments", (req, res) => {
    checkoutSchema
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

  router.get("/paymentsfind/:userid", async (req, res) => {
    const user = req.params.userid;

    const result = await checkoutSchema.find({userId: user});
    if(result) {
      res.json(result)
    } else {
      res.send("no se han encontrado resultados")
    }

  });

module.exports = router;