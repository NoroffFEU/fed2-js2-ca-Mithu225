import { singlePost } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete";

async function displaySinglePost() {
  try {
    const userFromLocal = localStorage.getItem("user");
    const user = userFromLocal != null ? JSON.parse(userFromLocal) : {};

    const id = localStorage.getItem("single-post-id");
    if (!id) {
      throw new Error("No post ID found in localStorage");
    }
    const { data: result } = await singlePost(id);

    const respone = `
          <div class="post-card">
            <div class="post-info">
              <div class="user-info" id="post">
                <img class="avatar" src="${result.author.avatar.url}" alt="${
      result.author.avatar.alt
    }" />
              </div>
              <div class="user-details">
                <div class="user">
                  <p class="username">${result.author.name}</p>
                  <p class="time">${result.created}</p>
                </div>
       
  
                <div class="edit-post" >
                ${
                  user.name === result.author.name
                    ? `
                  <button id="edit-button" type="button" data-id="${result.id}">
                    <ion-icon class="edit-icon" name="create-outline">
                    </ion-icon>
                  </button>
                  <button id="delete-button" type="button" data-id="${result.id}">
                    <ion-icon class="delete-icon" name="trash-outline"></ion-icon></button>
                  
                  `
                    : ""
                }
                </div>
              </div>
             
            </div>

            <p class="post-content">
              ${result.title}
            </p>
             <p class="post-content">
              ${result.body}
            </p>
               <div class="post-list">
  
   
            <div class="interaction-bar">
            ${
              result.media && result.media.url
                ? `<div class="upload-content">
                <img class="upload-img" src="${result.media.url}" />
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
}

displaySinglePost();
