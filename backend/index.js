const express = require('express');
const app = express();


// Test Route
app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Server Startup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));