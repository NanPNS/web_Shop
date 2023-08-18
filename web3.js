const products = document.querySelectorAll('.product');
const buttons = document.querySelectorAll('.quantity-btn');
const price = document.getElementById('total-price');
const productsList = document.getElementById('selected-products-list');
const info = document.getElementById('discount-info');

let total = 0;
let selectedProducts = [];

products.forEach((product, index) => {
    const productPrice = parseFloat(product.querySelector('p').innerText.split('$')[1]);
    const minusButton = buttons[index * 2];
    const plusButton = buttons[index * 2 + 1];

    const quantityElement = product.querySelector('.quantity');
    
    minusButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.innerText);
        if (quantity > 0) {
            quantity--;
            quantityElement.innerText = quantity;
            total -= productPrice;
            updateSelectedProductsList(product, quantity);
            updateTotalPrice();
        }
    });
    
    plusButton.addEventListener('click', () => {
        let quantity = parseInt(quantityElement.innerText);
        quantity++;
        quantityElement.innerText = quantity;
        total += productPrice;
        updateSelectedProductsList(product, quantity);
        updateTotalPrice();
    });
});

function updateSelectedProductsList(product, quantity) {
    const productName = product.querySelector('h3').innerText;
    const existingProduct = selectedProducts.find(item => item.productName === productName);
    
    if (quantity === 0 && existingProduct) {
        selectedProducts = selectedProducts.filter(item => item.productName !== productName);
    } else if (quantity > 0 && !existingProduct) {
        selectedProducts.push({ productName, quantity });
    } else if (quantity > 0 && existingProduct) {
        existingProduct.quantity = quantity;
    }
    
    displaySelectedProductsList();
}

function displaySelectedProductsList() {
    productsList.innerHTML = '';
    selectedProducts.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.productName}: ${item.quantity} `;
        productsList.appendChild(listItem);
    });
}

function updateTotalPrice() {
    let discountedTotal = total;
    if (total > 1000) {
        const discountAmount = total * 0.1;
        discountedTotal -= discountAmount;
        info.innerText = `ลด 10%: -$${discountAmount.toFixed(2)}`;
    } else {
        info.innerText = '';
    }

    price.innerText = `$${discountedTotal.toFixed(2)}`;
}

// ทำการคำนวณเริ่มต้นเมื่อหน้าเว็บโหลดเสร็จ
updateTotalPrice();

let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}