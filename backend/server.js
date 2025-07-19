const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Waitlist = require("./models/Waitlist");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.panacea-tech.com",
      "https://panacea-tech.com",
      "http://www.panacea-tech.com",
      "http://panacea-tech.com",
      "https://apovohealth.com",
      "http://apovohealth.com",
      "apovohealth.com",
      "http://panacea-tech.com.s3-website-us-east-1.amazonaws.com",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Basic route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Health check endpoint for AWS
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Add this new endpoint
app.post("/api/waitlist", async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    // Run these operations in parallel
    const [existingEmail] = await Promise.all([
      Waitlist.findOne({ email }).lean(), // .lean() for faster queries
    ]);

    if (existingEmail) {
      return res.status(400).json({
        message: "This email is already on our waitlist!",
      });
    }

    // Create and save in one operation
    await Waitlist.create({ name, phone, email });

    res.status(201).json({
      message: "Successfully added to waitlist!",
    });
  } catch (error) {
    console.error("Waitlist error:", error);
    res.status(500).json({
      message: "Error adding to waitlist",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
