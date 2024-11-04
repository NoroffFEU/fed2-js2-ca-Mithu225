import { readPosts, readPostsByUser } from "../../api/post/read";
import { onLogout } from "../../ui/auth/logout";
import { authGuard } from "../../utilities/authGuard";
import { handleHeaderButtons } from "../../utilities/header";
import { handlePostButtons } from "../../utilities/posts";
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
    `<img class="w-24 h-16 rounded-full" src="${user.avatar.url}" />
            <p class="text-purple-700 text-lg font-bold cursor-pointer py-3 ">${user.name}</p>`
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

  handleHeaderButtons();

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
          <div class="w-1/2 p-5 border-4 rounded-md relative overflow-hidden" style="border-color: transparent; background-image: linear-gradient(white, white), linear-gradient(135deg, #9747ff, #07d8ba); background-origin: border-box; background-clip: padding-box, border-box;">
            <div class="flex gap-4">
              <div class="flex items-center justify-between" id="post">
                <img class="flex items-center rounded-full w-20 h-16" src="${
                  item.author.avatar.url
                }" alt="${item.author.avatar.alt}" />
              </div>
              <div class="flex justify-between w-full">
                <div class="user">
                  <p class="text-purple-700 text-lg font-bold cursor-pointer py-1" id="username" data-username="${
                    item.author.name
                  }">
                  ${item.author.name}
                </p>
                  <p class="text-gray-500 text-sm">${formatDateTime(
                    item.created
                  )}</p>
                </div>
       
  
                <div class="ml-auto flex gap-2" >
                ${
                  user.name === item.author.name
                    ? `
                  <button id="edit-button" class="border-0 bg-white" type="button" data-id="${item.id}">
                    <ion-icon class="text-purple-600 "delete-icon text-xl cursor-pointer"" name="create-outline">
                    </ion-icon>
                  </button>
                  <button id="delete-button" class="border-0 bg-white" type="button" data-id="${item.id}">
                    <ion-icon class="text-purple-600 "delete-icon text-xl cursor-pointer"" name="trash-outline"></ion-icon></button>
                  
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
                <img class="w-full py-4" src="${item.media.url}" />
              </div>`
                : ""
            }
            
              <div class="flex items-center text-purple-600 mb-2.5 text-xl">
                <ion-icon class="heart" name="heart-outline"></ion-icon>
                <p>3</p>
              </div>
               
              <hr class="w-full border-b border-gray-300 my-2.5"/>
              <div class="flex justify-around w-full">
                <div class="flex items-center text-purple-600 text-base cursor-pointer">
                  <ion-icon name="thumbs-up-outline"></ion-icon>
                  <p class="mx-2">Like</p>
                </div>
                <div class="flex items-center text-purple-600 text-base cursor-pointer">
                  <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                  <p class="mx-2">Comment</p>
                </div>
                <div class="flex items-center text-purple-600 text-base cursor-pointer">
                  <ion-icon name="share-social-outline"></ion-icon>
                  <p class="mx-2">Share</p>
                </div>
              </div>
            </div>
          </div>


`;
    });

    onRenderBySelector("#post-container", response);

    handlePostButtons(renderpost, posts);

    onClickBySelector("#logout-button", onLogout);
  }

  renderpost();
}
