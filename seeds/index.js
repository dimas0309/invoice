const items = require('./products');
const mysql = require('mysql2');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'user',
	password: 'userpassword',
	database: 'invoicedb'
})

db.connect((err) => {
    if(err){
        console.error('error connecting: ' + err.stack);
    }
    console.log('Database conneted ');
});

const setProducts = () => {
    for (let i = 0; i < 26;i++){
        const products = {
            brand: `${items[i].brand}`,
            item: `${items[i].item}`,
            partnumber: `${items[i].partnumber}`,
            price: `${items[i].price}`
        }

        db.query (
            'INSERT INTO products SET?',
            products, (err, result) => {
                if (err) throw err;
            console.log(products);
        }); 

    }
}

setProducts();






