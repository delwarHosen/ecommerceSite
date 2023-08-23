const loadProduct = async () => {
    const loadData = await fetch("https://fakestoreapi.com/products")
    const data = await loadData.json()
    return data
}

const setAllMenu = async () => {
    const data = await loadProduct();
    const menu = document.getElementById('menu-item')
    const uniqueArray = [];
    for (const product of data) {
        console.log(product.category)
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);
            const li = document.createElement('li')
            li.innerHTML = `<a>${product.category}</a>`
            menu.appendChild(li)
        }
    }
}

setAllMenu()