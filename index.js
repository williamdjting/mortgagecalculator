const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const basicRoutes = require('./routes/basic');


const app = express();


// for front end and back end server communication
app.use(cors());

// middleware to handle form-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// middleware to handle JSON
app.use(bodyParser.json());

// middle ware to handle JSON
app.use(express.json());


// mount routes
app.use('/basic', basicRoutes);     

// start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



module.exports = app; 
// export the app for testing