const express = require("express");

const router = express.Router();

const userSchema = require("../model/userSchema");

//create our web services / API
//Post Method
router.post("/addUser", async (req, res) => {
  const data = new userSchema({
    userid: req.body.userid,
    // name: req.body.name,
    password: req.body.password,
    contact: req.body.contact,
    image: req.body.image,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAllUser", async (req, res) => {
  try {
    const data = await userSchema.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/loginUser", async (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;
  try {
    const data = await userSchema.find({ userid: userid, password: password });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getUser/:id", async (req, res) => {
  try {
    const data = await userSchema.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await userSchema.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userSchema.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
