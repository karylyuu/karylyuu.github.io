window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("sakana-container");

  const sakana = new SakanaWidget({
    el: container,
  });

  sakana.mount();

  sakana.setCharacter({
    image: "./character.png",
    scale: 0.4,
  });

  // 위치 고정 (유나 스타일)
  container.style.position = "fixed";
  container.style.right = "40px";
  container.style.bottom = "0px";
  container.style.zIndex = "9999";
});
