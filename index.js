const express = require('express');
const bodyParser = require('body-parser');
const basicRoutes = require('./routes/basic');


const app = express();

// Middleware to handle form-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to handle JSON (still supported)
app.use(bodyParser.json());

// Mount routes
app.use('/basic', basicRoutes);       // Prefix for basic operations


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
