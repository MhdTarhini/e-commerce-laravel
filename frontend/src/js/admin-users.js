function htmlUsers(
  image,
  fist_name,
  last_name,
  email,
  role,
  nb_visit,
  nb_order
) {
  return ` <img src="${image}" alt="" srcset="">
            <div class="bottom-side">
                <div class="user-name">${fist_name}</div>
                <div class="user-name">${last_name}</div>
                <div class="user-name">${email}</div>
                <div class="user-name">${role}</div>
                <div class="num-of-order">Nb of order : <span>${nb_visit}</span></div>
                <div class="num-of-visit">Nb of visit : <span>${nb_order}</span></div>
                <div class="make-admin">Make Admin</div>
                </div>`;
}
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const reposnse = await axios.get("http://127.0.0.1:8000/api/get_all_users");
    const all_users = reposnse.data.users;
    const users_container = document.querySelector(".user-container");
    all_users.forEach((user) => {
      const div = document.createElement("div");
      div.classList.add("user-card");
      div.innerHTML = htmlUsers(
        user.image,
        user.first_name,
        user.last_name,
        user.address,
        user.role,
        user.number_of_visit,
        0
      );
      users_container.append(div);
    });
  } catch (error) {
    console.error(error);
  }
});
