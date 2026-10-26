const deleteBtn = document.getElementById("deleteBtn");

if (deleteBtn) {
  deleteBtn.addEventListener("click", async () => {
    const pathSegments = window.location.pathname.split('/');
    const blogUniqueId = pathSegments[pathSegments.length - 1];
    
    console.log("Deleting blog ID:", blogUniqueId);

    try {
      const response = await fetch(`/remove-blog/${blogUniqueId}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Deleted successfully!");
        window.location.href = data.redirectUrl;
      } else {
        alert("Failed to delete blog.");
      }
    } catch (error) {
      console.error("Delete request failed:", error);
    }
  });
}