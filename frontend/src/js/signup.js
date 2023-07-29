const sign_up_btn = document.querySelector("button");
sign_up_btn.addEventListener("click", singUp);

const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const address = document.getElementById("address");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repeat_Password = document.getElementById("repeat-password");

async function singUp(event) {
  event.preventDefault();
  const sign_up_data = new FormData();
  sign_up_data.append("first_name", first_name.value);
  sign_up_data.append("last_name", last_name.value);
  sign_up_data.append("address", address.value);
  sign_up_data.append("email", email.value);
  sign_up_data.append("password", password.value);
  // sign_up_data.append("image", "");

  let valid_data = 0;
  if (password.value.length < 6) {
    password.style.borderColor = "red";
    document.querySelector(".pass-error").classList.remove("none");
  } else {
    document.querySelector(".pass-error").classList.add("none");
    valid_data += 1;
  }
  if (password.value !== repeat_Password.value) {
    password.style.borderColor = "red";
    repeat_Password.style.borderColor = "red";
  } else {
    password.style.borderColor = "black";
    repeat_Password.style.borderColor = "black";
    valid_data += 1;
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
    valid_data += 1;
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
    valid_data -= 1;
  }
  if (!one_checked) {
    check_question.style.color = "red";
  } else {
    check_question.style.color = "black";
  }
  // sign_up_data.append("intersted", customer_intersted_cat);
  if (valid_data == 3) {
    try {
      const response = await fetch("localhost:8000/api/register", {
        method: "POST",
        body: sign_up_data,
      });
      window.location.href = "index.html";
      // localStorage.setItem("userData", JSON.stringify(response.json().user));
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        sign_up_data
      );
      localStorage.setItem("userData", JSON.stringify(response));

      if (response.data.status === "success") {
        console.log(response.data.message);
        console.log(response.data.user);
        console.log(response.data.authorisation.token);

        window.location.href = "index.html";
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
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
