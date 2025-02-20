const User = require("./Router/User.js");
const Chatbot = require("./Router/Chatbot.js");

const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use("/user", User);
app.use("/chatbot", Chatbot);

app.get("/", async (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "we cooking rn" });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});