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
      <img class="w-24 h-16 rounded-full" src="${profile.avatar.url}" />
      <div>
      <div class="edit-profile">
            <p class="text-purple-700 text-lg font-bold cursor-pointer py-1">${profile.name}</p>
             <a href="#">
          <ion-icon class="text-purple-600" name="create-outline"></ion-icon
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
          <div class="w-1/2 p-5 border-4 rounded-md relative overflow-hidden" style="border-color: transparent; background-image: linear-gradient(white, white), linear-gradient(135deg, #9747ff, #07d8ba); background-origin: border-box; background-clip: padding-box, border-box;">
            <div class="post-info">
              <div class="user-info" id="post">
                <img class="flex items-center rounded-full w-20 h-16" src="${
                  item.author.avatar.url
                }" alt="${item.author.avatar.alt}" />
              </div>
              <div class="flex justify-between w-full">
                <div class="user">
                  <p class="text-purple-700 text-lg font-bold cursor-pointer py-1">${
                    item.author.name
                  }</p>
                  <p class="text-gray-500 text-sm">${formatDateTime(
                    item.created
                  )}</p>
                </div>
       
  
                <div class="ml-auto flex gap-2" >
                ${
                  user.name === item.author.name
                    ? `
                  <button id="edit-button" type="button" data-id="${item.id}">
                    <ion-icon class="text-purple-600" name="create-outline">
                    </ion-icon>
                  </button>
                  <button id="delete-button" type="button" data-id="${item.id}">
                    <ion-icon class="text-purple-600" name="trash-outline"></ion-icon></button>
                  
                  `
                    : ""
                }
                </div>
              </div>
             
            </div>

            <p class="my-4 text-base leading-6 break-words">
              ${item.title}
            </p>
             <p class="my-4 text-base leading-6 break-words">
              ${item.body}
            </p>
               <div class="post-list">
  <div class="post-item" id="post-1">
    <button id="see-more" 
  class="border-none bg-white text-[#875acb] cursor-pointer" type=button data-id="${
    item.id
  }">See more..</button></div></div>
            <div class="flex flex-col items-start">
            ${
              item.media && item.media.url
                ? `<div class="upload-content">
                <img class="upload-img" src="${item.media.url}" />
              </div>`
                : ""
            }
            
              <div class="flex items-center text-purple-600 mb-2.5 text-xl">
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
