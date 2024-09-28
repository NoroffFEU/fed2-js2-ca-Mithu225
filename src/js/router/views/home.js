import { readPosts, readPostsByUser } from "../../api/post/read";
import { onLogout } from "../../ui/auth/logout";
import { onDeletePost } from "../../ui/post/delete";
import { authGuard } from "../../utilities/authGuard";
import {
  onRenderBySelector,
  onClickBySelector,
  getLoggedUser,
  formatDateTime,
} from "../../utilities/utils";

const user = getLoggedUser();

if (!user) {
  authGuard();
} else {
  init();
}

function init() {
  onRenderBySelector(
    "#avatar-home",
    `<img class="avatar-img" src="${user.avatar.url}" />
            <p class="username">${user.name}</p>`
  );

  onClickBySelector("#statusInput", () => {
    window.location.href = "/post/create/";
  });

  onClickBySelector("#selected-all-post", () => {
    onRenderBySelector("#selected-post", `All post`);
    renderpost();
  });

  onClickBySelector("#selected-my-post", () => {
    onRenderBySelector("#selected-post", `My post`);
    renderpost("byUser");
  });

  onClickBySelector("#list", () => {
    window.location.href = "/";
  });

  onClickBySelector("#profile", () => {
    localStorage.setItem("dataUserName", user.name);
    window.location.href = "/profile/";
  });
  onClickBySelector("#logout-button", onLogout);

  async function renderpost(type) {
    let posts = [];
    if (type === "byUser") {
      const result = await readPostsByUser(user.name);
      posts = result.data;
    } else {
      const result = await readPosts();
      posts = result.data;
    }

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
                  <p class="username" id="username" data-username="${
                    item.author.name
                  }">
                  ${item.author.name}
                </p>
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
    <button id=see-more type=button data-id="${
      item.id
    }">See more..</button></div></div>
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
    onRenderBySelector("#post-container", response);

    document.querySelectorAll("#username").forEach((userElm) => {
      userElm.addEventListener("click", () => {
        const dataUserName = userElm.getAttribute("data-username");
        localStorage.setItem("dataUserName", dataUserName);

        window.location.href = "/profile/";
      });
    });

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
        renderpost(posts.filter((item) => item.id != buttonDeleteId));
      });
    });

    document.querySelectorAll("#see-more").forEach((button) => {
      button.addEventListener("click", () => {
        const buttonSeemoreID = button.getAttribute("data-id");
        localStorage.setItem("single-post-id", buttonSeemoreID);
        window.location.href = "/post/";
      });
    });
    onClickBySelector("#logout-button", onLogout);
  }

  renderpost();
}
