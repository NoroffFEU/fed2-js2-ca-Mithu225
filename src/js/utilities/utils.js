export function onClickBySelector(selector, callback) {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener("click", callback);
  } else {
    console.error("Not found the selector", selector);
  }
}

export function onRenderBySelector(selector, content) {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = content;
  } else {
    console.error("Not found the selector", selector);
  }
}

export function getLoggedUser() {
  const userFromLocal = localStorage.getItem("user");
  const user = userFromLocal != null ? JSON.parse(userFromLocal) : {};
  return user;
}

export function formatDateTime(dateStr) {
  const dateObj = new Date(dateStr);

  const formattedDate =
    dateObj.toLocaleDateString("nb-NO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) +
    " " +
    dateObj.toLocaleTimeString("nb-NO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return formattedDate;
}
