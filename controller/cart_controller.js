const express = require("express");

const router = express.Router();

const Cartschema = require("../model/CartSchema");

//create our web services / API
//Post Method
router.post("/addCart", async (req, res) => {
  const { bookname, price, quantity, bookimage, authore, offer } = req.body;
  const data = new Cartschema({
    userid: req.body.userid,
    itemid: req.body.itemid,
    itemquantity: req.body.itemquantity,
    items: [{ bookname, price, quantity, bookimage, authore, offer }]
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAllcartitem/:userid", async (req, res) => {
  try {
    const data = await Cartschema.find({ userid: req.params.userid });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/deleteCartitem/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Cartschema.findByIdAndDelete(id);
    res.json({
      message: `Book with ${data._id} has been deleted.`
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/updateCartitem/:id", async (req, res) => {
  try {
    const id = req.params.id; // Cart document ID
    const { itemId, quantity } = req.body; // Payload should include itemId and quantity

    // Update the specific item's quantity within the items array
    const result = await Cartschema.findOneAndUpdate(
      { _id: id, "items._id": itemId }, // Match the cart and item
      { $set: { "items.$.quantity": quantity } }, // Update the item's quantity
      { new: true } // Return the updated document
    );

    if (!result) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
