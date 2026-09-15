document.addEventListener("DOMContentLoaded", () => {
    // 1. Dark Mode Toggle
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeText = themeToggleBtn.querySelector(".theme-text");

    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute("data-theme", "dark");
        themeText.textContent = "Light";
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        themeText.textContent = "Dark";
    }

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const targetTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);
        themeText.textContent = targetTheme === "dark" ? "Light" : "Dark";
    });

    // 2. Profile Image Fallback Detection
    const profileImg = document.getElementById("profile-img");
    const fallback = document.getElementById("profile-fallback");

    profileImg.addEventListener("error", () => {
        profileImg.style.display = "none";
        fallback.style.display = "flex";
    });

    // Check if profile.jpg is missing right away
    if (!profileImg.complete || profileImg.naturalWidth === 0) {
        // If not loaded within 500ms, failover gracefully
        setTimeout(() => {
            if (profileImg.naturalWidth === 0) {
                profileImg.style.display = "none";
                fallback.style.display = "flex";
            }
        }, 500);
    }

    // 3. Expandable Case Study Details (Subtle accordions)
    const expandBtns = document.querySelectorAll(".expand-btn");
    expandBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const targetEl = document.getElementById(targetId);
            const isHidden = targetEl.hasAttribute("hidden");

            if (isHidden) {
                targetEl.removeAttribute("hidden");
                btn.textContent = "Close Architecture Breakdown ↑";
            } else {
                targetEl.setAttribute("hidden", "");
                btn.textContent = "Read Architecture Breakdown ↓";
            }
        });
    });

    // 4. One-Click Clipboard Copy with Toast
    const copyBtn = document.getElementById("copy-email-btn");
    const toast = document.getElementById("toast");

    copyBtn.addEventListener("click", async () => {
        const email = copyBtn.getAttribute("data-email");
        try {
            await navigator.clipboard.writeText(email);
            showToast("Email copied to clipboard");
        } catch (err) {
            // Fallback
            showToast("Selected: " + email);
        }
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2400);
    }
});