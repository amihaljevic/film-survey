import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Hola World");
});
app.listen(PORT, () => console.log(`⚡[Server]: Server running at http://localhost:${PORT}`));
