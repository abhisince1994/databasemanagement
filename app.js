const express = require('express');
const bodyParser = require('body-parser');
const tableRoutes = require('./routes/tableRoutes');
const db = require('./models');

const app = express();
const PORT = 3000; 

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files
app.set('view engine', 'ejs');

// Routes
app.use('/', tableRoutes);
app.use('/table', tableRoutes);

// Sync database and start server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
