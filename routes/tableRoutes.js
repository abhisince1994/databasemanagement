const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

// Routes
router.get('/', tableController.getTables);
router.post('/create-table', tableController.createTable);

router.get('/table/:tableName', tableController.viewTableRecords);
router.post('/table/:tableName/add-record', tableController.addRecord);
router.post('/table/:tableName/delete-record/:id', tableController.deleteRecord);

module.exports = router;
