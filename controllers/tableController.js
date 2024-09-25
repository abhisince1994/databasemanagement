const db = require('../models');
const Table = db.tables;

exports.createTable = async (req, res) => {
    const { tableName, fieldNames, fieldTypes } = req.body;
    try {
        if (Array.isArray(fieldNames) && Array.isArray(fieldTypes)) {
            let fieldsArray = fieldNames.map((name, index) => `${name} ${fieldTypes[index]}`);
            // Ensure the table has a primary key
            fieldsArray.push('id INT AUTO_INCREMENT PRIMARY KEY');
            let fieldsString = fieldsArray.join(', ');

            // Use Sequelize query to create the table
            await db.sequelize.query(`CREATE TABLE ${tableName} (${fieldsString})`);
            await Table.create({ name: tableName, fields: fieldsString });

            // After creation, redirect to the homepage to show the list of tables
            res.redirect('/');
        } else {
            res.status(400).send('Error: Fields and Types are required');
        }
    } catch (error) {
        res.status(500).send("Error creating table: " + error.message);
    }
};


exports.getTables = async (req, res) => {
    try {
        const tables = await Table.findAll();
        console.log(tables); // to check the output
        res.render('index', { tables });
    } catch (error) {
        res.status(500).send("Error fetching tables: " + error.message);
    }
};

// View records of a specific table
exports.viewTableRecords = async (req, res) => {
    const { tableName } = req.params;
    try {
        // Fetch records safely using parameterized queries
        const [results, metadata] = await db.sequelize.query(`SELECT * FROM ${tableName}`);
        res.render('table', { tableName, records: results });
    } catch (error) {
        res.status(500).send("Error retrieving records: " + error.message);
    }
};

// Add a new record to a table
exports.addRecord = async (req, res) => {
    const { tableName } = req.params;
    const newRecord = req.body;

    // Prepare fields and values, skipping the id field
    const fields = Object.keys(newRecord).join(', ');
    const values = Object.values(newRecord);
    
    try {
        // Use parameterized queries to insert values safely
        const placeholders = values.map(() => '?').join(', ');
        await db.sequelize.query(`INSERT INTO ${tableName} (${fields}) VALUES (${placeholders})`, { replacements: values });
        res.redirect(`/table/${tableName}`);
    } catch (error) {
        res.status(500).send("Error adding record: " + error.message);
    }
};


// Delete a record by ID
exports.deleteRecord = async (req, res) => {
    const { tableName, id } = req.params;
    try {
        // Use a parameterized query to safely delete the record by ID
        await db.sequelize.query(`DELETE FROM ${tableName} WHERE id = ?`, { replacements: [id] });
        res.redirect(`/table/${tableName}`);
    } catch (error) {
        res.status(500).send("Error deleting record: " + error.message);
    }
};
