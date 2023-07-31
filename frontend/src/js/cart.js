document.querySelector(".categories-nav").addEventListener("click", () => {
  window.location.href = "home.html?page=categories";
});
document.querySelector(".home-nav").addEventListener("click", () => {
  window.location.href = "home.html";
});
function itemsFrom(id, image, name, description, price, category) {
  return `<tr>
            <td>${id}</td>
            <td><img src=${image} class=product-image alt="Product 1"></td>
            <td>${name}</td>
            <td>${description}</td>
            <td>${price}$</td>
            <td>${category}</td>
            <td>
                <button class="edit-${id}">Edit</button>
                <button class="delete-${id}">Delete</button>
            </td>
        </tr>`;
}

let categories_obj = {};
const table_body = document.querySelector("tbody");
function displayProducts(products) {
  const categories = JSON.parse(localStorage.getItem("categories"));
  categories.forEach((category) => {
    categories_obj[category.id] = category.category;
  });
  products.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = itemsFrom(
      product.id,
      product.image,
      product.name,
      product.description,
      product.price,
      categories_obj[product.category_id]
    );
    table_body.appendChild(tr);
    const delete_btn = document.querySelector(`.delete-${product.id}`);
    delete_btn.addEventListener("click", async () => {
      try {
        const reposnse = await axios.delete(
          `http://127.0.0.1:8000/api/delete_product/${product.id}`
        );
        if (reposnse.data.status == "success") {
          window.location.href = "admin.html";
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
}
async function getUserItems() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/get_cart_items/1"
    );
    const cart_products = response.data.products;
    displayProducts(cart_products);
  } catch (error) {
    console.error(error);
  }
}
getUserItems();
