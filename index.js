if (process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || process.env.SERVER_PORT;
const ejsMate = require('ejs-mate');
const mysql = require('mysql2');
const { resolve } = require('path');
 
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
    multipleStatements: true
})

db.connect((err) => {
    if(err){
        console.error('error connecting: ' + err.stack);
    }
    console.log('Database conneted ');
});

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req,res) => {

   const sql = "SELECT item, price FROM products;SELECT MAX(id) AS invoiceId FROM invoice";

   db.query(sql, (err,results) => {
       if (err) { throw err}

       const products = results[0];
       const invoiceId = results[1][0].invoiceId + 1;
       
       console.log(invoiceId);
       
       res.render('invoices/home',{products,invoiceId})
   })
})

app.post('/', (req,res) => {
    
    const {item,price,quantity,amount,total,invoiceId,balance_due, amount_paid}  = req.body;
    const items = Object.values(item.filter(Boolean));
    const prices = Object.values(price.filter(Boolean));
    const quantities = Object.values(quantity.filter(Boolean));
    const amounts = Object.values(amount.filter(Boolean));
    const len = items.length;

    const setInvoice = () => {
        const invoice = {
            total: total,
            amount_paid: amount_paid,
            balance_due: balance_due
        }

        db.query(
            'INSERT INTO invoice SET?',
            invoice, (err, result) => {
                if (err) throw err;
                console.log(total)
            }
        )
    }

    const setInvoiceLine = () => {
        for (let i = 0; i < len; i++){
            const invoiceLine = {
                item: items[i],
                price: prices[i],
                quantity: quantities[i],
                amount: amounts[i],
                invoice_id: invoiceId
            }
    
            db.query(
                'INSERT INTO invoice_line SET?',
                invoiceLine, (err, result) => {
                    if (err) throw err;
                    console.log(invoiceLine)
                }
            )
        }
    }

    setInvoice();
    setInvoiceLine();

    res.redirect('/');
})

app.listen(port, () => {
	console.log(`APP IS LISTENING ON PORT ${port}!`);
}) 
