document.addEventListener("DOMContentLoaded", (event) => {
  let elems = document.querySelectorAll("article :not(pre) > code")
  elems.forEach((i) => {
    let span = document.createElement("span");
    span.classList.add("code");
    span.textContent = i.textContent;
    i.replaceWith(span)
  })
});
