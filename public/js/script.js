const titleTextarea = document.getElementById("blogTitle");
const descriptionTextarea = document.getElementById("blogDescription");
const postBlogBtn = document.getElementById("postBlogBtn");

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

if (postBlogBtn && titleTextarea && descriptionTextarea) {
  const pathSegments = window.location.pathname.split("/");
  const isEditing = pathSegments.includes("edit-blog");
  const editId = isEditing ? Number(pathSegments[pathSegments.length - 1]) : null;

  // size the boxes to existing text (matters when editing)
  autoResize(titleTextarea);
  autoResize(descriptionTextarea);

  postBlogBtn.addEventListener("click", () => {
    const titleData = titleTextarea.value.trim();
    const bodyData = descriptionTextarea.value.trim();

    if (!titleData || !bodyData) {
      alert("Fill out both title and body!");
      return;
    }

    const blogData = {
      id: isEditing ? editId : Date.now(),
      title: titleData,
      body: bodyData,
      previewText: bodyData.length > 40 ? bodyData.slice(0, 40) + "..." : bodyData
    };

    const endpoint = isEditing ? `/update-blog/${editId}` : "/post-blog";
    const method = isEditing ? "PUT" : "POST";

    sender(blogData, endpoint, method);
  });

  titleTextarea.addEventListener("input", () => autoResize(titleTextarea));

  titleTextarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      descriptionTextarea.focus();
    }
  });

  descriptionTextarea.addEventListener("input", () => autoResize(descriptionTextarea));
}

async function sender(payload, endpoint, method) {
  try {
    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      window.location.href = data.redirectUrl;
    } else {
      alert("Failed to save blog.");
    }
  } catch (error) {
    console.error("net comms failed:", error);
  }
}