const cart = document.querySelector (".cart");
const cart_menu = document.querySelector (".cart_menu");
const totalPriceEl = document.querySelector (".total_price");
const productPrices = document.querySelectorAll (".product_price");
const addToCartButton = document.querySelectorAll (".cart_box");
const productNames = document.querySelectorAll (".description_heading");
const productImages = document.querySelectorAll (".catalog_img");
const cartBlock = document.querySelector(".cart_block");
let totalPrice = Number(totalPriceEl.textContent);
const productArr = []
const usedProducts = new Set();
class Product {
    constructor(name, price, image, id, quantity) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.id = id;
        this.quantity = quantity;
    }

    getProductMarkup() {
        return `
        <div class="cart_item" data-number=${this.id}>
          <img src=${this.image} alt="cart_product" class="cart_img">
            <div class="cart_info_block">
              <p class="product_name">${this.name}</p>
               <div class="stars_block">
                 <i class="fa-solid fa-star"></i>
                 <i class="fa-solid fa-star"></i>
                 <i class="fa-solid fa-star"></i>
                 <i class="fa-solid fa-star"></i>
                 <i class="fa-solid fa-star"></i>
               </div>
               <div class="product_summary"><span class="product_quantity">${this.quantity}</span> x $<span class="product_price">${this.price}</span></div>
             </div>
             <i class="fa-solid fa-circle-xmark"></i>
      `;
    }
}
cart.addEventListener("click", () => {
    cart_menu.classList.toggle("hidden");
})

cart_menu.addEventListener("click", deleteItem)

for (let i = 0; i < addToCartButton.length; i++) {
    let name = productNames[i];
    let price = productPrices[i];
    let image = productImages[i];
    productArr.push(new Product(name.textContent, price.textContent, image.src, i, 1));

}
const productElsArr = [];
console.log (productArr)
let productQuantity;
addToCartButton.forEach(el => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        if (!usedProducts.has(productArr[el.parentElement.dataset.id].id)) {
            cartBlock.insertAdjacentHTML("afterend", productArr[el.parentElement.dataset.id].getProductMarkup());
            usedProducts.add(productArr[el.parentElement.dataset.id].id);
        } else {
            productQuantity = Number(productArr[el.parentElement.dataset.id].quantity);
            productQuantity += 1;
            productArr[el.parentElement.dataset.id].quantity = productQuantity;
            const currEl = document.querySelector(`[data-number="${productArr[el.parentElement.dataset.id].id}"]`)
            console.log (currEl)
            currEl.querySelector(".product_quantity").textContent = productQuantity;
            console.log ("Already exists")
        }

        totalPrice += Number(productArr[el.parentElement.dataset.id].price);
        totalPriceEl.textContent = totalPrice;
    })
})



function deleteItem(e) {
    if (e.target.classList.contains("fa-circle-xmark")) {
        const priceEl = e.target.parentElement.querySelector(".product_price");
        const quantityEl = e.target.parentElement.querySelector(".product_quantity");
        productQuantity = Number(quantityEl.textContent);
        totalPrice -= Number(priceEl.textContent);
        totalPriceEl.textContent = totalPrice;
        usedProducts.delete(+e.target.parentElement.dataset.number);
        if (productQuantity > 1) {
            productQuantity -= 1;
            quantityEl.textContent = productQuantity;
        } else {
            e.target.parentElement.remove();
            productArr[e.target.parentElement.dataset.number].quantity = 1;
        }
    }
}

