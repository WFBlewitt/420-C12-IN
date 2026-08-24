document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-reveal]").forEach((block) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = block.getAttribute("data-reveal-label") || "Afficher";
    button.className = "md-button";
    const content = Array.from(block.children);
    content.forEach((child) => {
      child.hidden = true;
    });
    button.addEventListener("click", () => {
      const shouldShow = content.some((child) => child.hidden);
      content.forEach((child) => {
        child.hidden = !shouldShow;
      });
      button.textContent = shouldShow ? "Masquer" : (block.getAttribute("data-reveal-label") || "Afficher");
    });
    block.prepend(button);
  });
});
