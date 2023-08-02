const auth = JSON.parse(localStorage.getItem("auth"));
axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
const userData = JSON.parse(localStorage.getItem("userData"));
document
  .querySelector(".profile-img")
  .setAttribute(
    "src",
    `http://127.0.0.1:8000/uploads/userImages/${userData.image}`
  );

document.querySelector(".categories-nav").addEventListener("click", () => {
  window.location.href = "home.html?page=categories";
});
document.querySelector(".fav-nav").addEventListener("click", () => {
  window.location.href = "home.html?page=favorites";
});
document.querySelector(".home-nav").addEventListener("click", () => {
  window.location.href = "home.html";
});
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

function itemsFrom(id, image, name, description, price, category, quantity) {
  return `
            <td>${id}</td>
            <td><img src=http://127.0.0.1:8000/uploads/productsImages/${image} class=product-image alt="Product 1"></td>
            <td>${name}</td>
            <td>${description}</td>
            <td>${price * quantity}$</td>
            <td>${category}</td>
            <td><svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" class="up-${id}">
<title>up</title>
<path d="M11.25 15.688l-7.656 7.656-3.594-3.688 11.063-11.094 11.344 11.344-3.5 3.5z"></path>
</svg>${quantity}<svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" class="down-${id}">
<title>down</title>
<path d="M11.125 16.313l7.688-7.688 3.594 3.719-11.094 11.063-11.313-11.313 3.5-3.531z"></path>
</svg></td>
            <td>
                <button class="delete-${id} delete">Delete</button>
            </td>`;
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
      categories_obj[product.category_id],
      product.quantity
    );
    table_body.appendChild(tr);
    const up_quantity = document.querySelector(`.up-${product.id}`);
    const down_quantity = document.querySelector(`.down-${product.id}`);
    up_quantity.addEventListener("click", () => {
      UpdateQuantity(`up/${product.id}`);
    });
    down_quantity.addEventListener("click", () => {
      UpdateQuantity(`down/${product.id}`);
    });
    const delete_btn = document.querySelector(`.delete-${product.id}`);
    delete_btn.addEventListener("click", async () => {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/remove_cart_items/${product.id}`
        );
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    });
  });
}
async function getUserItems() {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/get_cart_items/${userData.id}`
    );
    const cart_products = response.data.products;
    displayProducts(cart_products);
  } catch (error) {
    console.error(error);
  }
}
getUserItems();

async function UpdateQuantity(path) {
  try {
    await axios.get(`http://127.0.0.1:8000/api/update-quantity/${path}`);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}
