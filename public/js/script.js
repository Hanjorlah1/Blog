const titleTextarea = document.getElementById("blogTitle");
const descriptionTextarea = document.getElementById("blogDescription");
const postBlogBtn = document.getElementById("postBlogBtn");

postBlogBtn.addEventListener("click", () => {
  const blogUniqueId = Date.now();
  const titleData = titleTextarea.value.trim();
  const bodyData = descriptionTextarea.value.trim();
  const blogData = {
    id: blogUniqueId, 
    title: titleData,
    body: bodyData
  }
  if (!blogData.title || !blogData.body) {
    alert("Fill Out both title and body!");
    return;
  }
  sender(blogData);
})





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

async function sender(package) {
  try{
    const response = await fetch("/post-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(package)
    });

    if (response.ok) {
      alert("successful");
    } else {
      alert("failed")
    }
  } catch (error) {
    console.error(`net comms failed:`, error);
  }
}
