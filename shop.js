function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function filterProducts() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product-card');

  products.forEach(product => {
    const name = product.querySelector('h3').textContent.toLowerCase();
    product.style.display = name.includes(input) ? 'block' : 'none';
  });
}

if (document.getElementById("cartItems")) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let total = 0;
    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.innerHTML = `
        <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}
        <button onclick="removeItem(${index})">Remove</button></p>`;
      cartContainer.appendChild(itemElement);
      total += item.price;
    });
    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
  }
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
// Attach event listeners to all "Add to Cart" buttons
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".product-card button");
  buttons.forEach((btn, index) => {
    const product = btn.closest(".product-card");
    const name = product.querySelector("h3").textContent;
    const price = parseFloat(product.querySelector("p").textContent.replace("$", ""));

    btn.addEventListener("click", () => addToCart(name, price));
  });
});
