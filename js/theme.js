// theme.js - Gerenciamento centralizado do tema
function applyTheme(isLight) {
    const html = document.documentElement;
    const themeIcon = document.getElementById("theme-icon");

    if (isLight) {
        html.classList.add("light");
        if (themeIcon) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
        }
        document.querySelectorAll('#title, #titulo').forEach(el => {
            el.classList.add('text-gray-800');
            el.classList.remove('text-white');
        });
    } else {
        html.classList.remove("light");
        if (themeIcon) {
            themeIcon.classList.replace("fa-sun", "fa-moon");
        }
        document.querySelectorAll('#title, #titulo').forEach(el => {
            el.classList.add('text-white');
            el.classList.remove('text-gray-800');
        });
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isLight = savedTheme === "light" || (!savedTheme && !prefersDark);
    applyTheme(isLight);
}

function setupThemeSwitcher() {
    const toggleDiv = document.getElementById("toggle-theme");

    if (toggleDiv) {
        toggleDiv.addEventListener("click", () => {
            const isLight = !document.documentElement.classList.contains("light");
            applyTheme(isLight);
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });
    }
}

// Inicialização do tema
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupThemeSwitcher();
});