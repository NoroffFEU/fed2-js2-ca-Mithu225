import "./css/style.css";

import router from "./js/router";

await router(window.location.pathname);

const deleteIcon = document.querySelector(".delete-icon");
