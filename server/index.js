const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Project Cashless!" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Lancé sur le http://localhost:${PORT}`);
});
