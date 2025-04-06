const express = require('express');
const dotenv = require('dotenv');
const mainRoutes = require('./routes/routes');
const connectDB = require('./mongodb/connect');

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.use('/', mainRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});