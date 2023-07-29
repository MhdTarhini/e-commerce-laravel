const sign_up_btn = document.querySelector("button");
sign_up_btn.addEventListener("click", singUp);

function singUp() {
  const first_name = document.getElementById("first-name");
  const last_name = document.getElementById("last-name");
  const address = document.getElementById("address");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const repeat_Password = document.getElementById("repeat-password");
  const interst = document.getElementById("interst");
  if (password.value !== repeat_Password.value) {
    password.style.borderColor = "red";
    repeat_Password.style.borderColor = "red";
  }
  const sign_up_data = new FormData();
  sign_up_data.append("first-name", first_name.value);
  sign_up_data.append("last-name", last_name.value);
  sign_up_data.append("address", address.value);
  sign_up_data.append("email", email.value);
  sign_up_data.append("password", password.value);
  sign_up_data.append("intersted", interst.value);

  for (const [key, value] of sign_up_data.entries()) {
    if (value == "") {
      document.getElementById(`${key}`).style.borderColor = "red";
    } else {
      document.getElementById(`${key}`).style.borderColor = "black";
    }
    console.log(key);
    console.log(value);
  }
}
