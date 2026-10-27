const deleteBtn = document.getElementById("deleteBtn");
const editBtn = document.getElementById("editBlogBtn");

if (deleteBtn) {
  const defaultLabel = deleteBtn.textContent;
  let confirmTimer;

  function resetDeleteBtn() {
    clearTimeout(confirmTimer);
    deleteBtn.classList.remove("is-confirming");
    deleteBtn.textContent = defaultLabel;
  }

  deleteBtn.addEventListener("click", async () => {
    // first click: ask for confirmation (resets itself after 3s)
    if (!deleteBtn.classList.contains("is-confirming")) {
      deleteBtn.classList.add("is-confirming");
      deleteBtn.textContent = "Click again to confirm";
      confirmTimer = setTimeout(resetDeleteBtn, 3000);
      return;
    }

    // second click: actually delete
    clearTimeout(confirmTimer);
    deleteBtn.classList.remove("is-confirming");

    const pathSegments = window.location.pathname.split("/");
    const blogUniqueId = pathSegments[pathSegments.length - 1];

    setLoading(deleteBtn, true);

    try {
      const response = await fetch(`/remove-blog/${blogUniqueId}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast("Deleted successfully!", "success", 1000);
        setTimeout(() => (window.location.href = data.redirectUrl), 600);
      } else {
        showToast("Failed to delete blog.", "error");
        setLoading(deleteBtn, false);
        deleteBtn.textContent = defaultLabel;
      }
    } catch (error) {
      console.error("Delete request failed:", error);
      showToast("Couldn't reach the server.", "error");
      setLoading(deleteBtn, false);
      deleteBtn.textContent = defaultLabel;
    }
  });
}

if (editBtn) {
  editBtn.addEventListener("click", () => {
    const pathSegments = window.location.pathname.split("/");
    const blogUniqueId = pathSegments[pathSegments.length - 1];

    setLoading(editBtn, true);
    window.location.href = `/edit-blog/${blogUniqueId}`;
  });
}
