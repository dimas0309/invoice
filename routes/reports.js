const express = require('express');
const router = express.Router();
const reports = require('../controllers/reports')

router.get('/cashReports', reports.cashReports);

module.exports = router