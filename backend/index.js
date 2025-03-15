const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Test Route
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Route Handlers
app.use('/movies', require ('./routes/movieRoutes'));
app.use('/list', require ('./routes/listRoutes'));

// Server Startup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));