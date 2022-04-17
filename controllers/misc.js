app.post('/', (req,res) => {
    
    const {item,price,quantity,amount,total}  = req.body;
    const items = Object.values(item.filter(Boolean));
    const prices = Object.values(price.filter(Boolean));
    const quantities = Object.values(quantity.filter(Boolean));
    const amounts = Object.values(amount.filter(Boolean));
    const len = items.length;

    const setInvoice = () => {
        const invoice = {
            total: total
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
                amount: amounts[i]
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