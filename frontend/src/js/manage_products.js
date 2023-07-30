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
const submit_btn = document.querySelector("button");

const urlParams = new URLSearchParams(window.location.search);
const product_id_param = urlParams.get("id") ? urlParams.get("id") : "";
const products_data = JSON.parse(localStorage.getItem("products"));
const categories_data = JSON.parse(localStorage.getItem("categories"));

if (product_id_param != "") {
  console.log("hi");
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
  console.log(product_id_param);
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
    let category_id = 0;
    categories_data.forEach((category) => {
      if (category.category == product_category) {
        category_id = category.id;
        return category_id;
      }
    });
    let update_data = new FormData();
    update_data.append("name", product_name.value);
    update_data.append("price", product_price.value);
    update_data.append("description", product_description.value);
    update_data.append("category_id", category_id);
    update_data.append(
      "image",
      "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
    );
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
