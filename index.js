if (process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8081;
const ejsMate = require('ejs-mate');
const mysql = require('mysql2');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'dimas0309',
	database: 'invoicedb'
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

    db.query(
        'SELECT item, price FROM `products`', (err, results) => {
            results
            res.render('invoices/home', {results})
        }
    )

})

app.listen(port, () => {
	console.log(`APP IS LISTENING ON PORT ${port}!`);
}) 
