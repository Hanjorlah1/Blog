// Small shared UI helpers: toasts, button loading state, header shadow.

(function () {
  // ----- toast -----
  let stack;

  window.showToast = function (message, type = "info", duration = 2200) {
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      stack.setAttribute("role", "status");
      document.body.appendChild(stack);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    stack.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("is-leaving");
      toast.addEventListener("animationend", () => toast.remove(), { once: true });
    }, duration);
  };

  // ----- button loading state -----
  window.setLoading = function (btn, isLoading) {
    if (!btn) return;
    btn.classList.toggle("is-loading", isLoading);
    btn.disabled = isLoading;
  };

  // ----- shake an invalid field -----
  window.flagInvalid = function (el) {
    if (!el) return;
    el.classList.remove("is-invalid");
    void el.offsetWidth; // restart the animation
    el.classList.add("is-invalid");
    el.addEventListener("input", () => el.classList.remove("is-invalid"), { once: true });
  };

  // ----- header gets a shadow once you scroll -----
  const header = document.querySelector("header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
