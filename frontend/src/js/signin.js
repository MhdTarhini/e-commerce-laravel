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
const logo = document.querySelector(".logo");
const body = document.querySelector("body");
logo.addEventListener("click", () => {
  logo.classList.add("go");
  body.classList.add("go");
  document.querySelector(".sign-in-container").classList.remove("none");
});
