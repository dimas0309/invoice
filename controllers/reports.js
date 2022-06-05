const express = require('express');
const app = express();
const mysql = require('mysql2');

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
    multipleStatements: true
})

module.exports.cashReports = (req, res) => {
    const sql = "SELECT DATE(invoice_date) AS date, SUM(total) AS total, SUM(amount_paid) AS amount_paid, SUM(balance_due) AS balance_due FROM invoice GROUP BY DATE(invoice_date);";

    db.query(sql, (err,results) => {
        if (err) {throw err}

        const reports = results;
    
        console.log(reports);
        
        res.render('invoices/cash_reports', {reports});
    })

}