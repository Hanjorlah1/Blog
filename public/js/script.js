// 1. Grab your elements safely
const titleTextarea = document.getElementById("blogTitle");
const descriptionTextarea = document.getElementById("blogDescription");
const postBlogBtn = document.getElementById("postBlogBtn");


if (postBlogBtn && titleTextarea && descriptionTextarea) {
  
  postBlogBtn.addEventListener("click", () => {
    const blogUniqueId = Date.now();
    const titleData = titleTextarea.value.trim();
    const bodyData = descriptionTextarea.value.trim();
    const previewTextData = bodyData.length > 40 
      ? bodyData.slice(0, 40) + "..." 
      : bodyData;
    const blogData = {
      id: blogUniqueId, 
      title: titleData,
      body: bodyData,
      previewText: previewTextData
    }
    if (!blogData.title || !blogData.body) {
      alert("Fill Out both title and body!");
      return;
    }
    sender(blogData);
  });

  titleTextarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  titleTextarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      descriptionTextarea.focus();
    }
  });

  descriptionTextarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });
}

// 3. Sender function (stays the same)
async function sender(payload) {
  try {
    const response = await fetch("/post-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      alert("successful!");
      window.location.href = data.redirectUrl; 
    } else {
      alert("failed");
    }
  } catch (error) {
    console.error(`net comms failed:`, error);
  }
}

// 4. Global Click Listener (Now safe because the script won't crash upstream!)
document.addEventListener("click", (e) => {
  const clickedBlog = e.target.closest(".blog");
  
  if (clickedBlog) {
   
    const blogId = clickedBlog.id;
    if (blogId) {
      blogFinder(blogId);
    }
  }
});

function blogFinder(id) {
  console.log("Navigating to blog ID:", id);
  
 
  window.location.href = `/blog/${id}`;
}