import { readPosts } from "../../api/post/read";
import { authGuard } from "../../utilities/authGuard";

authGuard();
const userFromLocal = localStorage.getItem("user");
const user = userFromLocal != null ? JSON.parse(userFromLocal) : {};

console.log(user);

const result = await readPosts();

const allpost = result.data;
const mypost = allpost.filter((item) => {
  return item.author.name === user.name;
});

document.getElementById(
  "avatar-home"
).innerHTML = `<img class="avatar-img" src="${user.avatar.url}" />
            <p class="username">${user.name}</p>`;

document.getElementById("statusInput").addEventListener("click", () => {
  window.location.href = "/post/create/index.html";
});

document.getElementById("selected-all-post").addEventListener("click", () => {
  document.getElementById("selected-post").innerHTML = `All post`;
  renderpost(allpost);
});

document.getElementById("selected-my-post").addEventListener("click", () => {
  document.getElementById("selected-post").innerHTML = `My post`;
  renderpost(mypost);
});

function renderpost(posts) {
  const response = posts.map((item) => {
    return `
          <div class="post-card">
            <div class="post-info">
              <div class="user-info" id="post">
                <img class="avatar" src="${item.author.avatar.url}" alt="${
      item.author.avatar.alt
    }" />
              </div>
              <div class="user-details">
                <div class="user">
                  <p class="username">${item.author.name}</p>
                  <p class="time">${item.created}</p>
                </div>
                <div class="edit-post">
                  <a href="/post/edit/index.html">
                    <ion-icon class="edit-icon" name="create-outline"></ion-icon
                  ></a>
                  <ion-icon class="delete-icon" name="trash-outline"></ion-icon>
                </div>
              </div>
            </div>

            <p class="post-content">
              ${item.body}
            </p>
             <p class="post-content">
              ${item.title}
            </p>
            <div class="interaction-bar">
            ${
              item.media && item.media.url
                ? `<div class="upload-content">
                <img class="upload-img" src="${item.media.url}" />
              </div>`
                : ""
            }
            
              <div class="likes">
                <ion-icon class="heart" name="heart-outline"></ion-icon>
                <p>3</p>
              </div>
              <hr />
              <div class="actions">
                <div class="action">
                  <ion-icon name="thumbs-up-outline"></ion-icon>
                  <p>Like</p>
                </div>
                <div class="action">
                  <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                  <p>Comment</p>
                </div>
                <div class="action">
                  <ion-icon name="share-social-outline"></ion-icon>
                  <p>Share</p>
                </div>
              </div>
            </div>
          </div>


`;
  });
  document.getElementById("post-container").innerHTML = response;
}

renderpost(allpost);
