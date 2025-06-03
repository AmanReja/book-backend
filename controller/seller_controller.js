const express = require("express");

const router = express.Router();

const BookSchema = require("../model/BookSchema");

//create our web services / API
//Post Method
router.post("/addBook", async (req, res) => {
  const data = new BookSchema({
    bookname: req.body.bookname,
    price: req.body.price,
    quantity: req.body.quantity,
    rating: req.body.rating,
    offer: req.body.offer,
    authore: req.body.authore,
    bookimage: req.body.bookimage,
    bookimageid: req.body.bookimageid,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Method
// router.get("/getAllBooks/:searcher?", async (req, res) => {
//   try {
//     let data;
//     if (req.params.searcher) {
//       const searcher = req.params.searcher.trim();
//       const data = await BookSchema.find({
//         bookname: { $regex: searcher, $options: "i" }
//       });
//     } else {
//       const data = await BookSchema.find();
//     }
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: "Server error while fetching books." });
//   }
// });
router.get("/getAllBooks/:searcher?", async (req, res) => {
  try {
    let data;

    // If there is a searcher parameter, find books by bookname using regex
    if (req.params.searcher) {
      const searcher = req.params.searcher.trim();
      data = await BookSchema.find({
        $or: [
          { bookname: { $regex: searcher, $options: "i" } },
          { authore: { $regex: searcher, $options: "i" } },
        ],
      });
    } else {
      // Otherwise, return all books
      data = await BookSchema.find();
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching books." });
  }
});

//Get by ID Method
router.get("/getBook/:id", async (req, res) => {
  try {
    const data = await BookSchema.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
// router.get("/filterbookByname/:searcher", async (req, res) => {
//   try {
//     const data = await BookSchema.find({
//       bookname: { $regex: req.params.searcher, $options: "i" }
//     });
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//Update by ID Method
router.patch("/updateBook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await BookSchema.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/deleteBook/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await BookSchema.findByIdAndDelete(id);
    res.json({ message: `Book with ${data.bookname} has been deleted.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
