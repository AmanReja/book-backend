const express = require("express");
const orderSchema = require("../model/orderSchema");
const router = express.Router();
const CartSchema = require("../model/CartSchema");

router.get("/", async (req, res) => {
  res.send("hii");
});

router.post("/addOrder1", async (req, res) => {
  res.status(200).json(req.body);
});

router.post("/addOrder", async (req, res) => {
  const data = new orderSchema({
    userid: req.body.userid,
    totalamount: req.body.totalamount,
    itemquantity: req.body.itemquantity,
    items: req.body.items,
  });

  console.log("order", data);

  try {
    const { userid } = req.body;
    const deleteCart = await CartSchema.deleteMany({ userid: userid });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    console.log("error in addorder", error);

    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
