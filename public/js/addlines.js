
const addRows = () => {
    const tr = document.createElement('tr');
    const types = ['text','number','number','number'];
    const names = ['item','price','quantity','amount'];
    
    tbody.appendChild(tr);

    for (let i = 0; i < 4; i++){
        const td = document.createElement('td');
        const input = document.createElement('input');

        tr.append(td);
        td.append(input);

        input.setAttribute('class','form-control');
        input.setAttribute('type',types[i]);
        input.setAttribute('name',names[i]);
        input.setAttribute('id',names[i]);
    }
}

const addProduct = () => {
    btn.addEventListener('click', () => {
        const list = datalist.value.split(" => ")
    
        setProduct(list[0],list[1])
    
        let len = product.length;

        if (len < 5){
            for (let i = 0; i < len; i++){
                tbody.children[i].children[0].children[0].value = product[i].item;
                tbody.children[i].children[1].children[0].value = product[i].price;
            }
        } else {
           /* from addlines.js file */ 
           addRows();
           for (let i = 4; i < len; i++){
               tbody.children[i].children[0].children[0].value = product[i].item;
               tbody.children[i].children[1].children[0].value = product[i].price;
           }
        }
    })
}



 

