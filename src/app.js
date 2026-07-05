require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

app.get('/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');

        res.status(200).json({
            success: true,
            message: 'SoundForge API is running',
            database: result.rows[0]
        
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});