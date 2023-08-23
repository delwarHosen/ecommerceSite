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
        // console.log(product.category)
        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);
            const li = document.createElement('li')
            li.innerHTML = `<a>${product.category}</a>`
            menu.appendChild(li)
        }
    }
}

setAllMenu()


const searchField = document.getElementById('search-field');

searchField.addEventListener('keypress', async (event) => {

    if (event.key === "Enter") {
        const serachValue = searchField.value;
        // console.log(serachValue)
        const loadAllProduct = await loadProduct();

        const foundProduct = loadAllProduct.filter(product => product.category.includes(serachValue))
        // console.log(foundProduct);
        const notFoundMsg = document.getElementById('not-found')

        const productContainer = document.getElementById('products-container')
        productContainer.textContent = "";
        notFoundMsg.textContent = "";

        // not found msg show
        if (foundProduct.length === 0) {
            notFoundMsg.innerHTML = `<p class="text-3xl font-bold text-center text-orange-500 ">Not found any Products.Please search again</p> `
            return
        }

        foundProduct.forEach(element => {
            // console.log(element)
            const { image, title, category, description } = element;
            // console.log(image, title, category)
            const div = document.createElement('div')
            div.innerHTML = `
            <div class="card card-compact w-96 bg-base-100 shadow-xl">
                      <figure><img src=${image} class="h-60 w-full" alt="Shoes" /></figure>
                <div class="card-body">
                       <h2 class="card-title">${category}</h2>
                       <p>${title.length > 20 ? title.slice(0, 20) + '...' : title}</p>
                       
                    <div class="card-actions justify-end">
                      <label for="my_modal_6" class="btn btn-primary modal-button" onclick="openModal('${description}','${image}','${category}')">open modal</label>
                    </div>
                </div>
            </div>
            `;
            productContainer.appendChild(div);

        });

    }

})

const openModal = (description, category, image) => {
    const modal = document.getElementById('modal-detail')
    const div = document.createElement('div')
    div.classList.add("modal-box")
    div.innerHTML = `
                    <figure><img src=${image} class="h-60 w-full" alt="Shoes" /></figure>
                    <h3 class="font-bold text-lg">${category}</h3>
                    <p class="py-4">${description}</p>
                    <div class="modal-action">
                        <label for="my_modal_6" class="btn">Close!</label>
                    </div>
   `
    modal.appendChild(div)
}