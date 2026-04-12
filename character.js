window.addEventListener("load", () => {
  const el = document.getElementById("char");

  if (!el) {
    console.error("❌ char 없음");
    return;
  }

  console.log("✅ char 찾음");

  // 🔥 무조건 보이게 강제
  el.style.position = "fixed";
  el.style.left = "100px";
  el.style.top = "100px";
  el.style.width = "120px";
  el.style.height = "120px";
  el.style.background = "red";
  el.style.zIndex = "999999";
});
