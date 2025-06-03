const express = require("express");

const router = express.Router();

const AdminSchema = require("../model/AdminSchema");

//create our web services / API
//Post Method
router.post("/addAdmin", async (req, res) => {
  const data = new AdminSchema({
    adminid: req.body.adminid,
    // name: req.body.name,
    adminpassword: req.body.adminpassword,
    admincontact: req.body.admincontact
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAllAdmin", async (req, res) => {
  try {
    const data = await AdminSchema.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/loginAdmin", async (req, res) => {
  const adminid = req.body.adminid;
  const adminpassword = req.body.adminpassword;
  try {
    const data = await AdminSchema.find({
      adminid: adminid,
      adminpassword: adminpassword
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getAdmin/:id", async (req, res) => {
  try {
    const data = await AdminSchema.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/updateAdmin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await AdminSchema.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/deleteAdmin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await AdminSchema.findByIdAndDelete(id);
    res.send(`Document with ${data.adminid} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
