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
const sm_cart = document.querySelector(".cart-nav-sm");
const viewportWidth = window.innerWidth;
if (viewportWidth <= 497) {
  sm_cart.classList.remove("none");
}
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

const urlSearchParams = new URLSearchParams(window.location.search);

const page_param = urlSearchParams.get("page");
console.log(page_param);
document.querySelector(".all").addEventListener("click", () => {
  window.location.href = "../pages/home.html?page=all";
});
document.querySelector(".for-you").addEventListener("click", () => {
  window.location.href = "../pages/home.html?page=for-you";
});
console.log(userData.id);
///get_cart_items/{id?}
async function fetchItemsCart() {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/get_cart_items/${userData.id}`
    );
    const items_cart = await response.data.products;
    localStorage.setItem("items_cart", JSON.stringify(items_cart));
  } catch (error) {
    console.error(error);
  }
}
fetchItemsCart();
async function fetchfavorites() {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/get_user_fav/${userData.id}`
    );
    const products = await response.data.products;
    localStorage.setItem("favorites", JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
}
fetchfavorites();
async function checkAndcreateCart() {
  try {
    await axios.get(`http://127.0.0.1:8000/api/create_cart/${userData.id}`);
  } catch (error) {
    console.error(error);
  }
}
checkAndcreateCart();
async function fetchproducts(path) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/${path}`);
    const products = await response.data.products;
    displayProducts(products);
    localStorage.setItem("products", JSON.stringify(products));
  } catch (error) {
    console.error(error);
  }
}
async function fetchCategories(path) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/${path}`);
    const categories = await response.data.categories;
    localStorage.setItem("categories", JSON.stringify(categories));
    return categories;
  } catch (error) {
    console.error(error);
  }
}

function ProductsHTML(id, image, name, description, price) {
  return `
            <div class="top-side">
                <img src=http://127.0.0.1:8000/uploads/ProductsImages/${image} alt="" srcset="">
            </div>
            <div class="product-details none details-${id}">
                <div>${name}</div>
                <div>${description}</div>
                <div>${price}$</div>
                <div class="bottom">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" id="fav-${id}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <div class="add-cart-${id}"><svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="cart-${id}">
<g clip-path="url(#clip0_15_35)">
<rect width="24" height="24" fill="none"/>
<path d="M5.33331 6H19.8672C20.4687 6 20.9341 6.52718 20.8595 7.12403L20.1095 13.124C20.0469 13.6245 19.6215 14 19.1172 14H16.5555H9.44442H7.99998" stroke="#000000" stroke-linejoin="round"/>
<path d="M2 4H4.23362C4.68578 4 5.08169 4.30341 5.19924 4.74003L8.30076 16.26C8.41831 16.6966 8.81422 17 9.26638 17H19" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="10" cy="20" r="1" stroke="#000000" stroke-linejoin="round"/>
<circle cx="17.5" cy="20" r="1" stroke="#000000" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_15_35">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg></div>
                </div>
            </div>
        `;
}
const product_container = document.querySelector(".products-container");
function displayProducts(products) {
  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.classList.add("hover-effect");
    div.innerHTML = ProductsHTML(
      product.id,
      product.image,
      product.name,
      product.description,
      product.price
    );
    product_container.appendChild(div);
    const viewportWidth = window.innerWidth;
    let product_details = document.querySelector(`.details-${product.id}`);
    if (viewportWidth <= 497) {
      div.classList.toggle("hover-effect");
      div.addEventListener("click", () => {
        product_details.style.zIndex = "1";
      });
      product_details.addEventListener("click", () => {
        product_details.style.dislpay = "none";
        console.log("hello");
      });
    }
    // div.style.cursor = "pointer";
    // div.addEventListener("click", () => {
    //   window.location.href = `product_details.html?id=${product.id}`;
    // });
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    const items_cart = JSON.parse(localStorage.getItem("items_cart"));
    let cart_btn = document.getElementById(`cart-${product.id}`);
    if (items_cart) {
      items_cart.forEach((item) => {
        if (item.id == product.id) {
          cart_btn.setAttribute("fill", "#fcfcfc");
        }
      });
    }
    const fav_btn = document.getElementById(`fav-${product.id}`);
    favorites.forEach((fav) => {
      if (fav.id == product.id) {
        fav_btn.setAttribute("fill", "#f70707");
      }
    });
    fav_btn.addEventListener("click", async () => {
      if (fav_btn.getAttribute("fill") == "#f70707") {
        try {
          await axios.delete(
            `http://127.0.0.1:8000/api/remove_fav/${product.id}`
          );
          fav_btn.setAttribute("fill", "none");
        } catch (error) {
          console.error(error);
        }
      } else {
        const data = new FormData();
        data.append("user_id", userData.id);
        data.append("product_id", product.id);
        try {
          await axios.post("http://127.0.0.1:8000/api/add_to_fav", data);
          fav_btn.setAttribute("fill", "#f70707");
        } catch (error) {
          console.error(error);
        }
      }
    });
    cart_btn.addEventListener("click", async () => {
      if (cart_btn.getAttribute("fill") == "#fcfcfc") {
        try {
          await axios.delete(
            `http://127.0.0.1:8000/api/remove_cart_items/${prduct.id}`
          );
          cart_btn.setAttribute("fill", "none");
        } catch (error) {
          console.error(error);
        }
      } else {
        const data = new FormData();
        data.append("user_id", userData.id);
        data.append("product_id", product.id);
        data.append("price", product.price);
        try {
          await axios.post("http://127.0.0.1:8000/api/add_item", data);
          cart_btn.setAttribute("fill", "#fcfcfc");
        } catch (error) {
          console.error(error);
        }
      }
    });
  });
}
if (page_param == "for-you") {
  fetchproducts(`user_interest/${userData.id}`);
} else if (page_param == "categories") {
  fetchCategories("get_all_categories");
  let categories = JSON.parse(localStorage.getItem("categories"));

  let top_page = document.querySelector(".top-page");
  top_page.innerHTML = "";
  top_page.style.width = "100%";

  categories.forEach((ele) => {
    const span = document.createElement("span");
    span.classList.add(`category-${ele.id}`);
    span.innerHTML = `| ${ele.category} |`;
    top_page.appendChild(span);
    span.addEventListener("click", () => {
      const product_container = document.querySelector(".products-container");
      product_container.innerHTML = "";
      fetchproducts(`get_product_by_category/${ele.id}`);
    });
  });
} else if (page_param == "favorites") {
  fetchproducts(`get_user_fav/${userData.id}`);
} else {
  fetchproducts("get_all_products");
}
