const purbtn = tfoot.children[1].children[1].children[0];

const setDate = () => {
    const home = document.querySelector('.section-home');
    const date = new Date();

    home.children[0].children[1].children[1].innerText = date.toString().slice(0,25);
}


const printPage = () => {
    const header = document.querySelector('.section-header');
    const home = document.querySelector('.section-home');
    const p = document.createElement('p');
    
    header.children[0].children[0].innerHTML = "Repuestos San vicente";
    header.children[0].appendChild(p);
    p.className = "text-center";
    p.innerHTML = "Ave. San vicente de paul, #88, Los Mina";
    home.children[0].children[0].remove();
    home.children[0].children[1].remove();
    tfoot.children[1].children[1].children[0].setAttribute('hidden','true');
}

const formatTable = () => {
    const property = document.styleSheets[0].cssRules[1].style;

    property.removeProperty('overflow-x');
    property.removeProperty('overflow-y');

    for (let i = 5;i < 10; i++){
        tbody.children[i].remove();
    }
    for (let i = 5;i < 10; i++){
        tbody.children[i].remove();
    }
    for (let i = 5;i < 7; i++){
        tbody.children[i].remove();
    }

    //tfoot.children[1].remove();
}

setDate();

purbtn.addEventListener('click', () => {
    printPage();
    formatTable();
    window.print();
})



 