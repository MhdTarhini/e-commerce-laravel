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
const users_nav = document.querySelector(".products-nav");
users_nav.addEventListener("click", () => {
  window.location.href = "admin.html";
});

function htmlUsers(
  id,
  image,
  fist_name,
  last_name,
  email,
  address,
  role,
  nb_visit
) {
  return ` <img src="http://127.0.0.1:8000/uploads/userImages/${image}" alt="" srcset="">
            <div class="bottom-side">
                <div class="user-name">${fist_name}</div>
                <div class="user-name">${last_name}</div>
                <div class="user-name">${email}</div>
                <div class="user-name">${address}</div>
                <div class="user-name">${role}</div>
                <div class="num-of-visit">Nb of visit : <span>${nb_visit}</span></div>
                <button class="make-admin-${id}">Make Admin</button>
                </div>`;
}
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const reposnse = await axios.get("http://127.0.0.1:8000/api/get_all_users");
    const all_users = reposnse.data.users;
    console.log(all_users);
    const users_container = document.querySelector(".user-container");
    all_users.forEach((user) => {
      const div = document.createElement("div");
      div.classList.add("user-card");
      div.innerHTML = htmlUsers(
        user.id,
        user.image,
        user.first_name,
        user.last_name,
        user.email,
        user.address,
        user.role_id == 1 ? "admin" : "user",
        user.number_of_visit,
        0
      );
      users_container.append(div);
      const make_admin = document.querySelector(`.make-admin-${user.id}`);
      if (user.role_id == 1) {
        make_admin.style.backgroundColor = "green";
        make_admin.innerHTML = "admin";
      }
      make_admin.addEventListener("click", async () => {
        try {
          const reposnse = await axios.get(
            `http://127.0.0.1:8000/api/make_admin/${user.id}`
          );
          location.reload();
        } catch (error) {
          console.error(error);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
});
