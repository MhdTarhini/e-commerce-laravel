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
document.querySelector(".cart-nav").addEventListener("click", () => {
  window.location.href = "cart.html";
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

function ProductHTML(image, name, description, price) {
  return `<div class="product-container">
        <img src=http://127.0.0.1:8000/uploads/productsImages/${image} alt="" srcset="">
        <div class="details">
            <h3>${name}</h3>
            <div>${description}</div>
            <div>${price}$</div>
        </div>
    </div>`;
}

const product_container = document.querySelector(".products-container");
function displayProducts(products) {
  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = ProductsHTML(
      //   product.id,
      product.image,
      product.name,
      product.description,
      product.price
    );
    product_container.appendChild(div);
  });
}

async function fetchproduct() {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/get_product/47/10`
    );
    console.log(response);
    // const products = await response.data.products;
    // displayProducts(products);
    // localStorage.setItem("products", JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
}
fetchproduct();
