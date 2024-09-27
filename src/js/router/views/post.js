import { singlePost } from "../../api/post/read";
import { onLogout } from "../../ui/auth/logout";
import { onDeletePost } from "../../ui/post/delete";
import {
  formatDateTime,
  getLoggedUser,
  onClickBySelector,
} from "../../utilities/utils";

async function displaySinglePost() {
  try {
    const user = getLoggedUser();

    const id = localStorage.getItem("single-post-id");
    if (!id) {
      throw new Error("No post ID found in localStorage");
    }
    const { data: item } = await singlePost(id);

    const respone = `
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
                  <p class="time">${formatDateTime(item.created)}</p>
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
               <div class="post-list">
            <div class="post-item" id="post-1">
              </div></div>
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
          </div>`;
    document.getElementById("post-container").innerHTML = respone;
  } catch (error) {
    console.error("Failed to fetch the post:", error);
  }

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
      await onDeletePost(buttonDeleteId);
      renderpost(posts.filter((result) => result.id != buttonDeleteId));
    });
  });
  onClickBySelector("#list", () => {
    window.location.href = "/";
  });

  onClickBySelector("#profile", () => {
    window.location.href = "/profile/";
  });
  onClickBySelector("#logout-button", onLogout);
}

displaySinglePost();
