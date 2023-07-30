const urlSearchParams = new URLSearchParams(window.location.search);

const page_param = urlSearchParams.get("page");
console.log(page_param);
document.querySelector(".all").addEventListener("click", () => {
  window.location.href = "../pages/home.html?page=all";
});
document.querySelector(".for-you").addEventListener("click", () => {
  window.location.href = "../pages/home.html?page=for-you";
});

async function fetchproducts() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/get_all_products"
    );
    const products = await response.data.products;
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts(products);
  } catch (error) {
    console.error(error);
  }
}
function ProductsHTML(id, image, name, description, price) {
  return `<div class="product-card">
            <div class="top-side">
                <img src=${image} alt="" srcset="">
            </div>
            <div class="product-details none">
                <div>${name}</div>
                <div>${description}</div>
                <div>${price}$</div>
                <div class="add-cart-${id}">Add Cart</div>
            </div>
        </div>`;
}
const product_container = document.querySelector(".products-container");
function displayProducts(products) {
  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = ProductsHTML(
      product.id,
      product.image,
      product.name,
      product.description,
      product.price
    );
    product_container.appendChild(div);
  });
}
if (page_param !== "for-you") {
  fetchproducts();
} else {
  id = 6;
}
