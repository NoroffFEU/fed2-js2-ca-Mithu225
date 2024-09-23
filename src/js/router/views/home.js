import { readPosts } from "../../api/post/read";
import { authGuard } from "../../utilities/authGuard";

authGuard();

document.getElementById("statusInput").addEventListener("click", function () {
  window.location.href = "/post/create/index.html";
});

const result = await readPosts();

const data = result.data;
console.log(data);

const response = data.map((item) => {
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
              item.media
                ? `<div class="upload-content">
                <img class="upload-img" src="${item.media}" />
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
