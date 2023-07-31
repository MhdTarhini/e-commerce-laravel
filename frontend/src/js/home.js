document.querySelector(".categories-nav").addEventListener("click", () => {
  window.location.href = "home.html?page=categories";
});
document.querySelector(".cart-nav").addEventListener("click", () => {
  window.location.href = "cart.html";
});
document.querySelector(".home-nav").addEventListener("click", () => {
  window.location.href = "home.html";
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

async function fetchproducts(path) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/${path}`);
    const products = await response.data.products;
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts(products);
    console.log(products);
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
if (page_param == "for-you") {
  id = 6;
  fetchproducts("user_interest/6");
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
      document.querySelector(`.category-${ele.id}`).style.backgroundColor =
        "rgba(0, 0, 0, 0.2)";
    });
  });
} else {
  fetchproducts("get_all_products");
}
