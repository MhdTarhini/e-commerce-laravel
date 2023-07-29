const sign_up_btn = document.querySelector("button");
sign_up_btn.addEventListener("click", singUp);

function singUp() {
  const first_name = document.getElementById("first-name");
  const last_name = document.getElementById("last-name");
  const address = document.getElementById("address");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const repeat_Password = document.getElementById("repeat-password");
  let valid_data = false;
  if (password.value !== repeat_Password.value) {
    password.style.borderColor = "red";
    repeat_Password.style.borderColor = "red";
  } else {
    password.style.borderColor = "black";
    repeat_Password.style.borderColor = "black";
  }
  const sign_up_data = new FormData();
  sign_up_data.append("first-name", first_name.value);
  sign_up_data.append("last-name", last_name.value);
  sign_up_data.append("address", address.value);
  sign_up_data.append("email", email.value);
  sign_up_data.append("password", password.value);

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
      console.log(customer_intersted_cat);
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
  sign_up_data.append("intersted", customer_intersted_cat);
  console.log(valid_data);
}
