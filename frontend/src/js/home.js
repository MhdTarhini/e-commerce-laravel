document.querySelector(".categories-nav").addEventListener("click", () => {
  window.location.href = "home.html?page=categories";
});
document.querySelector(".fav-nav").addEventListener("click", () => {
  window.location.href = "home.html?page=favorites";
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
                <div class="bottom">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.993 5.09691C11.0387 4.25883 9.78328 3.75 8.40796 3.75C5.42122 3.75 3 6.1497 3 9.10988C3 10.473 3.50639 11.7242 4.35199 12.67L12 20.25L19.4216 12.8944L19.641 12.6631C20.4866 11.7172 21 10.473 21 9.10988C21 6.1497 18.5788 3.75 15.592 3.75C14.2167 3.75 12.9613 4.25883 12.007 5.09692L12 5.08998L11.993 5.09691ZM12 7.09938L12.0549 7.14755L12.9079 6.30208L12.9968 6.22399C13.6868 5.61806 14.5932 5.25 15.592 5.25C17.763 5.25 19.5 6.99073 19.5 9.10988C19.5 10.0813 19.1385 10.9674 18.5363 11.6481L18.3492 11.8453L12 18.1381L5.44274 11.6391C4.85393 10.9658 4.5 10.0809 4.5 9.10988C4.5 6.99073 6.23699 5.25 8.40796 5.25C9.40675 5.25 10.3132 5.61806 11.0032 6.22398L11.0921 6.30203L11.9452 7.14752L12 7.09938Z" fill="#080341"/>
</svg>
                <div class="add-cart-${id}"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
</svg>Add Cart</div>
                </div>
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
} else if (page_param == "favorites") {
} else {
  fetchproducts("get_all_products");
}


