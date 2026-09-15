document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.textContent = "Light";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.textContent = "Dark";
  }

  themeToggle.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    themeToggle.textContent = isDark ? "Dark" : "Light";
  });

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  const profileImg = document.getElementById("profile-img");
  const profileFallback = document.getElementById("profile-fallback");

  profileImg.addEventListener("error", () => {
    profileImg.style.display = "none";
    profileFallback.style.display = "flex";
  });

  if (!profileImg.complete || profileImg.naturalWidth === 0) {
    setTimeout(() => {
      if (profileImg.naturalWidth === 0) {
        profileImg.style.display = "none";
        profileFallback.style.display = "flex";
      }
    }, 400);
  }

  const copyBtn = document.getElementById("copy-btn");
  const toast = document.getElementById("toast");

  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.getAttribute("data-email");
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied to clipboard");
    } catch {
      showToast(email);
    }
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }
});
