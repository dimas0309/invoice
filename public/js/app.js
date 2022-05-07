const btn = document.querySelector('button');
const datalist = btn.previousElementSibling;
const tbody = document.querySelector('tbody');
const tfoot = document.querySelector('tfoot');
const btnqty = document.querySelectorAll('#quantity');

const product = []

const setProduct = (item, price) => {
    product.push({item,price})
}

const addProduct = () => {
    btn.addEventListener('click', () => {
        const list = datalist.value.split(" => ")
    
        setProduct(list[0],list[1])
    
        let len = product.length;

        for (let i = 0; i < len; i++){
            tbody.children[i].children[0].children[0].value = product[i].item;
            tbody.children[i].children[1].children[0].value = product[i].price;
        }
    })
}

const getTotal = () => {

    for (let btn of btnqty) {
    
        btn.addEventListener('click', () => {
            const price = btn.parentNode.previousElementSibling.children[0].value;
            const amount = btn.parentNode.nextElementSibling.children[0];
            const quantity = btn.value;
    
            amount.value = price*quantity;
    
            const len = product.length;
    
            let sum = 0;
    
            for (let i = 0; i < len; i++){
                sum += parseFloat(tbody.children[i].children[3].children[0].value);
            }
    
            tfoot.children[0].children[3].children[0].value = sum;
        })
    }
}

const getBalanceDue = () => {
    const total = tfoot.children[0].children[3].children[0];
    const amountPaid = tfoot.children[1].children[3].children[0];
    const balanceDue = tfoot.children[2].children[3].children[0];
    
    amountPaid.addEventListener('click', () => {
        const balanced = amountPaid.value - total.value;

        if (balanced >= 0){
            balanceDue.value = amountPaid.value - total.value;
        } else {
            balanceDue.value = 0;
        }
         
    })

}

addProduct();
getTotal();
getBalanceDue();

 






 



 

 



