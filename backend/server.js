require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const axios = require("axios");
const multer = require("multer");
const { createClient } = require("@deepgram/sdk");
const { runPylint } = require('./services/LintServices/Python/run-py-lint');
const fs = require("fs");


connectDB();

const app = express();
const PORT = process.env.PORT || 5005;
const FLASK_URL = process.env.FLASK_URL || "http://localhost:5000";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", require("./routes/AIPredictionsRoute"));
app.use("/", require("./routes/LinterRoutes"));

const deepgram = createClient(process.env.DEEPGRAM_API);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/tmp"); // reserved directory on OS
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const transcribeFile = async (path) => {
    try {
        const result = await deepgram.listen.prerecorded.transcribeFile(
            fs.readFileSync(path),
            {
                model: "nova-2",
                smart_format: true,
            }
        );
        return result.result?.results.channels[0].alternatives[0].transcript;
    } catch (err) {
        console.log(err);
    }
};

app.post("/", upload.single("audio"), async (req, res) => {
    const file = req.file;
    const response = await transcribeFile(file.path);
    res.send(response);
});

app.get("/call-flask", async (req, res) => {
    try {
        const flaskResponse = await axios.get(`${FLASK_URL}/flask-route`);
        res.json(flaskResponse.data);
    } catch (error) {
        console.error("Error calling Flask:", error.message);
        res.status(500).json({ error: "Error calling Flask API" });
    }
});

let server;
app.listen(PORT, () => {
    console.log("Server is running on Port:", PORT);
});

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});
