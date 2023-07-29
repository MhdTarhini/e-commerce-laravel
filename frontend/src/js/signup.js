const sign_up_btn = document.querySelector("button");
sign_up_btn.addEventListener("click", singUp);

const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const address = document.getElementById("address");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repeat_Password = document.getElementById("repeat-password");

async function singUp() {
  const sign_up_data = new FormData();
  sign_up_data.append("first_name", first_name.value);
  sign_up_data.append("last_name", last_name.value);
  sign_up_data.append("address", address.value);
  sign_up_data.append("email", email.value);
  sign_up_data.append("password", password.value);
  // sign_up_data.append("image", "");

  let valid_data = false;
  if (password.value.length < 6) {
    password.style.borderColor = "red";
    document.querySelector(".pass-error").classList.remove("none");
  } else {
    document.querySelector(".pass-error").classList.add("none");
    valid_data = true;
  }
  if (password.value !== repeat_Password.value) {
    password.style.borderColor = "red";
    repeat_Password.style.borderColor = "red";
  } else {
    password.style.borderColor = "black";
    repeat_Password.style.borderColor = "black";
  }

  let check_couter = 0;
  for (const [key, value] of sign_up_data.entries()) {
    if (value == "") {
      document.getElementById(`${key}`).style.borderColor = "red";
    } else {
      document.getElementById(`${key}`).style.borderColor = "black";
      check_couter += 1;
    }
  }
  if (check_couter == 5) {
    valid_data = true;
  }
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"][name="interest"]'
  );
  const check_question = document.querySelector(".check-question");
  const customer_intersted_cat = [];
  let one_checked = false;
  checkboxes.forEach((ele) => {
    if (ele.checked) {
      customer_intersted_cat.push(ele.value);
      one_checked = true;
    }
  });
  if (!one_checked) {
    valid_data = false;
  }
  if (!one_checked) {
    check_question.style.color = "red";
  } else {
    check_question.style.color = "black";
  }
  // sign_up_data.append("intersted", customer_intersted_cat);
  if (valid_data) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        body: sign_up_data,
      });
      console.log(response);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.erroe(error);
    }
  }
}
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
