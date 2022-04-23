"use strict";
const catalogEl = document.querySelector(".catalog");
const totalPriceEl = document.querySelector (".total_price");
const cartEl = document.querySelector (".cart");
const cartMenuEl = document.querySelector (".cart_menu");
const cartBlock = document.querySelector(".cart_block");
const cart = {};
class Product {
    constructor(id, name, price, image, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.quantity = quantity;
    }
    setProductMarkup() {
        const productMarkup =  `
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
        cartBlock.insertAdjacentHTML('afterbegin', productMarkup);
    }
}

cartEl.addEventListener("click", () => {
    cartMenuEl.classList.toggle("hidden");
})
catalogEl.addEventListener("click", evt => {
    if (evt.target.closest(".cart_box")) {
        evt.preventDefault();
        const currProduct = evt.target.closest(".item");
        const id = currProduct.dataset.id;
        const name = currProduct.querySelector('.description_heading').textContent;
        const price = currProduct.querySelector('.product_price').textContent;
        const image = currProduct.querySelector('.catalog_img').src;
        addToCart(id, name, price, image);
    }
})
cartBlock.addEventListener("click", evt => {
    if (evt.target.classList.contains("fa-circle-xmark")) {
        const currProduct = evt.target.closest(".cart_item")
        currProduct.querySelector(".product_quantity");
        const id = currProduct.dataset.number;
        deleteItem(id, currProduct);
    }
})
function deleteItem(id, currProduct) {
    totalPriceEl.textContent = getTotalPrice("-", id);
    if (cart[id].quantity > 1) {
        cart[id].quantity--;
        currProduct.querySelector(".product_quantity").textContent = cart[id].quantity;
    } else {
        currProduct.remove();
        delete(cart[id]);
    }
}
function addToCart(id, name, price, image) {
    if (!(id in cart)) {
        cart[id] = new Product(id, name, price, image, 1);
        cart[id].setProductMarkup();
    } else {
        cart[id].quantity++;
        const currEl = cartBlock.querySelector(`[data-number="${cart[id].id}"]`);
        currEl.querySelector(".product_quantity").textContent = cart[id].quantity;
    }
    totalPriceEl.textContent = getTotalPrice("+");


}
function getTotalPrice(op, id) {
    const totalSum = Object.values(cart).reduce((acc, product) => acc + product.price * product.quantity, 0);
    switch (op) {
        case "+":
            return totalSum;
        case "-":
            return totalSum - cart[id].price;
    }

}
