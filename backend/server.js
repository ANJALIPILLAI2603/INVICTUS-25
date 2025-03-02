const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// Test Route for '/'
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
