import { readPosts } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete";
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
  window.location.href = "/post/create/";
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
                <div class="edit-post" >
                ${
                  user.name === item.author.name
                    ? `
                  <button id="edit-button" type="button" data-id="${item.id}">
                    <ion-icon class="edit-icon" name="create-outline">
                    </ion-icon>
                  </button>
                  <button id="delete-button" type="button" data-id="${item.id}">
                    <ion-icon class="delete-icon" name="trash-outline"></ion-icon></button>
                  
                  `
                    : ""
                }
                </div>
              </div>
            </div>

            <p class="post-content">
              ${item.title}
            </p>
             <p class="post-content">
              ${item.body}
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

  document.querySelectorAll("#edit-button").forEach((button) => {
    button.addEventListener("click", () => {
      const buttonDataId = button.getAttribute("data-id");
      localStorage.setItem("post-id", buttonDataId);

      window.location.href = "/post/edit/";
    });
  });

  document.querySelectorAll("#delete-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const buttonDeleteId = button.getAttribute("data-id");
      console.log(buttonDeleteId);
      await onDeletePost(buttonDeleteId);
      renderpost(posts.filter((item) => item.id !== buttonDeleteId));
    });
  });
}

renderpost(allpost);
