const titleTextarea = document.getElementById("blogTitle");
const descriptionTextarea = document.getElementById("blogDescription");

titleTextarea.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

titleTextarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    descriptionTextarea.focus();
  }
})

descriptionTextarea.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});
