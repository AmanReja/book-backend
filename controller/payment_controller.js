const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const Payment = require("../model/paymentSchema"); // Import your Payment model

// Initialize Razorpay instance with your credentials
const razorpayInstance = new Razorpay({
  key_id: "rzp_test_ND81BEh4gRO77Q", // Your Razorpay Key ID
  key_secret: "your_key_secret" // Your Razorpay Key Secret
});

// Create a payment order
router.post("/createPayment", async (req, res) => {
  const { amount, brandname, quantity, brandimage, userid, status } = req.body;

  try {
    // Validate required fields
    // if (!amount || !brandname || !quantity || !brandimage || !userid) {
    //   return res.status(400).json({ error: "Missing required fields" });
    // }

    // Create a Razorpay order
    // const orderOptions = {
    //   amount: amount * 100, // Razorpay expects the amount in paise (1 INR = 100 paise)
    //   currency: "INR",
    //   receipt: `order_rcptid_${new Date().getTime()}`
    // };

    // Using async/await for Razorpay API call
    //const order = await razorpayInstance.orders.create(orderOptions);

    // Store payment information in the database
    const payment = new Payment({
      razorpayid: req.body.razorpayid,
      userid: req.body.userid,
      amount: req.body.amount,
      brandname: req.body.brandname,
      quantity: req.body.quantity,
      brandimage: req.body.brandimage,
      status: req.body.status
    });

    console.log(43, payment);

    const savepayment = await payment.save();

    // Return the order details along with the payment information
    res.status(200).json(savepayment);
  } catch (error) {
    console.error("Something went wrong in payment controller", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.patch("/sucessPayment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Payment.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
