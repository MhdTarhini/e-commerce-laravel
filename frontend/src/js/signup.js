const sign_up_btn = document.querySelector(".button");
sign_up_btn.addEventListener("click", singUp);


const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const address = document.getElementById("address");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repeat_Password = document.getElementById("repeat-password");
const profile_image = document.getElementById("profile-image");

async function singUp(event) {
  event.preventDefault();
  const sign_up_data = new FormData();
  sign_up_data.append("first_name", first_name.value);
  sign_up_data.append("last_name", last_name.value);
  sign_up_data.append("address", address.value);
  sign_up_data.append("email", email.value);
  sign_up_data.append("password", password.value);
  if (profile_image.files[0]) {
    sign_up_data.append("profile-image", profile_image.files[0]);
  }

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
    if (key == "profile-image") {
      continue;
    }
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
  let one_checked = false;
  checkboxes.forEach(async (ele) => {
    if (ele.checked) {
      return (one_checked = true);
    }
  });
  if (!one_checked) {
    valid_data -= 1;
  } else {
  }
  if (!one_checked) {
    check_question.style.color = "red";
  } else {
    check_question.style.color = "black";
  }
  if (valid_data == 3) {
    const checkedCheckboxes = document.querySelectorAll(
      'input[type="checkbox"][name="interest"]:checked'
    );
    const email_err = document.querySelector(".email-err");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        sign_up_data
      );
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      console.log(response);
      if (response.data.status === "success") {
        checkedCheckboxes.forEach((ele) => {
          if (ele.checked) {
            try {
              axios.get(
                `http://127.0.0.1:8000/api/add_interste/${response.data.user.id}/${ele.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${response.data.authorisation.token}`,
                  },
                }
              );
            } catch (error) {
              console.erroe(error);
            }
          }
        });
      }
      window.location.href = "../../index.html";
    } catch (error) {
      email_err.classList.remove("none");
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
