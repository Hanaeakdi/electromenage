const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variable
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Auth
app.use("/", require("./routers/auth/log-in.js"));
app.use("/", require("./routers/auth/sgin-in.js"));

// Global
app.use("/", require("./routers/global/image.js"));
app.use("/", require("./routers/global/products"));

// User
app.use("/", require("./routers/user/info.js"));
app.use("/", require("./routers/user/cart.js"));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`RTMS APi Server Online :`);
}) 