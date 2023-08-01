const auth = JSON.parse(localStorage.getItem("auth"));
axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
const userData = JSON.parse(localStorage.getItem("userData"));
document
  .querySelector(".profile-img")
  .setAttribute(
    "src",
    `http://127.0.0.1:8000/uploads/userImages/${userData.image}`
  );

const user_info = document.querySelector(" .profile-img");
const user_info_list = document.querySelector(".user-info-list");
user_info.addEventListener("click", () => {
  user_info_list.classList.toggle("show");
});

document.addEventListener("click", function (event) {
  if (!user_info_list.contains(event.target) && event.target !== user_info) {
    user_info_list.classList.remove("show");
  }
});
document.querySelector(".sign-out").addEventListener("click", async () => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/logout`);
    const data = await response.data;
    if ((data.status = "success")) {
      localStorage.clear();
      window.location.href = "../../index.html";
    }
  } catch (error) {
    console.error(error);
  }
});

const users_nav = document.querySelector(".users-nav");
users_nav.addEventListener("click", () => {
  window.location.href = "users_admin.html";
});

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
    localStorage.setItem("categories", JSON.stringify(categories));
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
                <button class="edit-${id} edit">Edit</button>
                <button class="delete-${id} delete">Delete</button>
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
    const edit_btn = document.querySelector(`.edit-${product.id}`);
    const delete_btn = document.querySelector(`.delete-${product.id}`);
    edit_btn.addEventListener("click", () => {
      window.location.href = `manage_products.html?id=${product.id}`;
    });
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

fetchproducts();
document.querySelector(".new-product").addEventListener("click", () => {
  window.location.href = `manage_products.html`;
});
