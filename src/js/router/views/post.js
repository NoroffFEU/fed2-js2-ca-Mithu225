import { singlePost } from "../../api/post/read";
import { handleHeaderButtons } from "../../utilities/header";
import { handlePostButtons } from "../../utilities/posts";
import { formatDateTime, getLoggedUser } from "../../utilities/utils";

async function displaySinglePost() {
  try {
    const user = getLoggedUser();

    const id = localStorage.getItem("single-post-id");
    if (!id) {
      throw new Error("No post ID found in localStorage");
    }
    const { data: item } = await singlePost(id);

    const respone = `
          <div class="w-1/2 p-5 border-4 rounded-md relative overflow-hidden" style="border-color: transparent; background-image: linear-gradient(white, white), linear-gradient(135deg, #9747ff, #07d8ba); background-origin: border-box; background-clip: padding-box, border-box;">
            <div class="flex gap-4">
              <div class="user-info" id="post">
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
            </div>
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
          </div>`;
    document.getElementById("post-container").innerHTML = respone;
  } catch (error) {
    console.error("Failed to fetch the post:", error);
  }

  handlePostButtons();

  handleHeaderButtons();
}

displaySinglePost();
