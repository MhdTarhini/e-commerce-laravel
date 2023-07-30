let categories_obj = {};
async function fetchCategories() {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/get_all_categories"
    );
    const categories = await response.data.categories;
    categories.forEach((category) => {
      categories_obj[category.id] = category.category;
    });
    console.log(categories_obj);
  } catch (error) {
    console.error(error);
  }
}

fetchCategories();

function productsFrom(id, image, name, description, price, category) {
  return `<tr>
            <td>${id}</td>
            <td><img src=${image} class=product-image alt="Product 1"></td>
            <td>${name}</td>
            <td>${description}</td>
            <td>${price}$</td>
            <td>${category}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        </tr>`;
}
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
const table_body = document.querySelector("tbody");
function displayProducts(products) {
  products.forEach((product) => {
    const tr = document.createElement("tr");
    tr.innerHTML = productsFrom(
      product.id,
      product.image,
      product.name,
      product.description,
      product.price,
      categories_obj[product.category_id]
    );
    table_body.appendChild(tr);
    const edit_btn = document.querySelector(".edit");
    const delete_btn = document.querySelector(".delete");
    edit_btn.addEventListener("click", () => {
      window.location.href = `manage_products.html?${product.id}`;
    });
  });
}

fetchproducts();
