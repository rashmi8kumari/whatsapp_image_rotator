function addRotateButtonsToDiv(div) {
  if (div.dataset.hasRotator === "true") return;

  let rotation = 0;
  div.style.transition = "transform 0.3s ease";

  const rotateLeft = document.createElement("button");
  rotateLeft.innerText = "⟲";
  rotateLeft.className = "rotate-btn";
  rotateLeft.style.right = "60px";

  const rotateRight = document.createElement("button");
  rotateRight.innerText = "⟳";
  rotateRight.className = "rotate-btn";

  rotateLeft.onclick = () => {
    rotation -= 90;
    div.style.transform = `rotate(${rotation}deg)`;
  };

  rotateRight.onclick = () => {
    rotation += 90;
    div.style.transform = `rotate(${rotation}deg)`;
  };

  div.style.position = "relative";
  div.appendChild(rotateLeft);
  div.appendChild(rotateRight);

  div.dataset.hasRotator = "true";

  console.log("Rotation buttons added to image div");
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType !== 1) return;

      // Detect background-image divs used in image viewer
      const possibleImageDivs = node.querySelectorAll?.("div[style*='background-image']");
      if (possibleImageDivs && possibleImageDivs.length > 0) {
        possibleImageDivs.forEach((div) => {
          const bg = div.style.backgroundImage || window.getComputedStyle(div).backgroundImage;
          if (bg.includes("blob:") || bg.includes("data:image")) {
            addRotateButtonsToDiv(div);
          }
        });
      }
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
console.log("WhatsApp Rotator observer running");








