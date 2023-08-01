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
const products_nav = document.querySelector(".products-nav");
products_nav.addEventListener("click", () => {
  window.location.href = "admin.html";
});
const users_nav = document.querySelector(".user-nav");
users_nav.addEventListener("click", () => {
  window.location.href = "users_admin.html";
});

const labels = document.querySelectorAll(".label");
labels.forEach((ele) => {
  let label_for = ele.getAttribute("for");
  let input = document.getElementById(`${label_for}`);
  input.addEventListener("focus", () => {
    ele.classList.add("active");
    input.removeAttribute("placeholder");
  });
  document.getElementById(`${label_for}`).addEventListener("blur", () => {
    ele.classList.remove("active");
    input.setAttribute("placeholder", `${ele.innerHTML}`);
  });
});

const product_name = document.getElementById("name");
const product_price = document.getElementById("price");
const product_description = document.getElementById("decription");
const product_image = document.getElementById("image");
const submit_btn = document.querySelector("button");

const urlParams = new URLSearchParams(window.location.search);
const product_id_param = urlParams.get("id") ? urlParams.get("id") : "";
const products_data = JSON.parse(localStorage.getItem("products"));

async function fetchCategories() {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/get_all_categories`
    );
    const categories = await response.data.categories;
    localStorage.setItem("categories", JSON.stringify(categories));
    return categories;
  } catch (error) {
    console.error(error);
  }
}
fetchCategories();
const categories_data = JSON.parse(localStorage.getItem("categories"));
if (product_id_param != "") {
  submit_btn.innerHTML = "update product";

  const matching_product = products_data.find(
    (ele) => ele.id == product_id_param
  );

  categories_data.forEach((category) => {
    if (category.id == matching_product.category_id) {
      const check = document.getElementById(`${category.id}`);
      check.setAttribute("checked", "checked");
    }
  });
  product_name.value = matching_product.name;
  product_price.value = matching_product.price;
  product_description.value = matching_product.description;
}

submit_btn.addEventListener("click", async () => {
  const checkboxes = document.querySelectorAll("[type='checkbox']");
  let product_category = "";
  let one_checked = 0;
  checkboxes.forEach((ele) => {
    if (ele.checked) {
      product_category = ele.value;
      one_checked += 1;
      return one_checked;
    }
  });
  if (one_checked == 1) {
    let update_data = new FormData();
    update_data.append("name", product_name.value);
    update_data.append("price", product_price.value);
    update_data.append("description", product_description.value);
    const checked_boxes = document.querySelector(
      "input[type='checkbox']:checked"
    );
    const image = product_image.files[0] ? product_image.files[0] : "";
    update_data.append("category_id", checked_boxes.id);
    update_data.append("image", image);

    if (product_id_param != "") {
      try {
        const reposnse = await axios.post(
          `http://127.0.0.1:8000/api/edit_product/${product_id_param}`,
          update_data
        );
        if (reposnse.data.status == "success") {
          window.location.href = "admin.html";
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const reposnse = await axios.post(
          `http://127.0.0.1:8000/api/edit_product/add`,
          update_data
        );
        if (reposnse.data.status == "success") {
          window.location.href = "admin.html";
        }
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    document.querySelector(".check-err").classList.remove("none");
  }
});
