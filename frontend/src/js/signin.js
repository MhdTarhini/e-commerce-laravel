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

const sign_in_btn = document.querySelector(".sign-in-btn");
sign_in_btn.addEventListener("click", signIn);

async function signIn() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const sign_up_data = new FormData();
  sign_up_data.append("email", email.value);
  sign_up_data.append("password", password.value);
  try {
    const response = await axios.post(
      "http://localhost:8000/api/login",
      sign_up_data
    );
    if (response.data.status === "success") {
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      localStorage.setItem("auth", JSON.stringify(response.data.authorisation));
      if (response.data.user.role_id == 1) {
        window.location.href = "src/pages/admin.html";
      } else {
        window.location.href = "src/pages/home.html";
      }
    } else {
      console.error(response.data.message);
    }
  } catch (error) {
    console.error(error);
  }
}
