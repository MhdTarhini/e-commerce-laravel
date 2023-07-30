function htmlUsers(
  id,
  image,
  fist_name,
  last_name,
  email,
  address,
  role,
  nb_visit,
  nb_order
) {
  return ` <img src="${image}" alt="" srcset="">
            <div class="bottom-side">
                <div class="user-name">${fist_name}</div>
                <div class="user-name">${last_name}</div>
                <div class="user-name">${email}</div>
                <div class="user-name">${address}</div>
                <div class="user-name">${role}</div>
                <div class="num-of-visit">Nb of visit : <span>${nb_visit}</span></div>
                <div class="num-of-order">Nb of order : <span>${nb_order}</span></div>
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

