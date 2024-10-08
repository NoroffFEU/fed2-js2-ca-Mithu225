import { readPostsByUser } from "../../api/post/read";
import { readProfile } from "../../api/profile/read";
import { authGuard } from "../../utilities/authGuard";
import { handleHeaderButtons } from "../../utilities/header";
import { handlePostButtons } from "../../utilities/posts";
import {
  formatDateTime,
  getLoggedUser,
  onRenderBySelector,
} from "../../utilities/utils";

authGuard();
const dataUserName = localStorage.getItem("dataUserName");
const user = getLoggedUser();
const profileResult = await readProfile(dataUserName || user.name);
const profile = profileResult.data;

const postsByUserResult = await readPostsByUser(dataUserName || user.name);
const postsByUser = postsByUserResult.data;

onRenderBySelector(
  "#profile-info",
  `<div class="avatar-profile">
      <img class="avatar-img" src="${profile.avatar.url}" />
      <div>
      <div class="edit-profile">
            <p class="username">${profile.name}</p>
             <a href="#">
          <ion-icon class="edit-icon" name="create-outline"></ion-icon
        ></a>
      </div>
      </div>
</div>
      
      `
);
onRenderBySelector(
  "#follow-details",
  `<div class="friends">
          <p>Follower</p>
          <p>${profile._count.followers}</p>
        </div>
        <div class="followings">
          <p>Followings</p>
          <p>${profile._count.following}</p>

        </div>
        <div class="post-total">
          <p>Post</p>
          <p>${profile._count.posts}</p>
          
        </div>`
);
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

  handlePostButtons(renderpost, posts);
}

handleHeaderButtons();

renderpost(postsByUser);
