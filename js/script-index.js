// Elementos para a transição de página
const pageTransition = document.getElementById('pageTransition');
const contentWrapper = document.getElementById('contentWrapper');

// Função para redirecionamento
function redirecionar(pageUrl) {
    if (pageUrl && pageUrl !== '#') {
        if (pageTransition) pageTransition.classList.add('active');
        if (contentWrapper) contentWrapper.classList.add('fade-out');

        setTimeout(() => {
            window.location.href = pageUrl;
        }, 300);
    }
}

// Configuração dos cards
function setupIndexCards() {
    document.querySelectorAll('.card-refino').forEach(card => {
        const onclickAttr = card.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/redirecionar\s*\(\s*'([^']+)'\s*\)/);
            if (match && match[1]) {
                let targetName = match[1];
                if (targetName !== '#') {
                    const pageUrl = targetName.endsWith('.php') ? targetName : `${targetName}.php`;
                    card.onclick = (e) => {
                        e.preventDefault();
                        redirecionar(pageUrl);
                    };
                }
            }
        }
    });
}

// Gerenciamento de tema
function setupThemeSwitcher() {
    const toggleDiv = document.getElementById("toggle-theme");
    const themeIcon = document.getElementById("theme-icon");
    const html = document.documentElement;

    const applyTheme = (isLight) => {
        if (isLight) {
            html.classList.add("light");
            if (themeIcon) {
                themeIcon.classList.replace("fa-moon", "fa-sun");
            }
            // Atualizar session via AJAX
            fetch('set_theme.php?theme=claro');
        } else {
            html.classList.remove("light");
            if (themeIcon) {
                themeIcon.classList.replace("fa-sun", "fa-moon");
            }
            // Atualizar session via AJAX
            fetch('set_theme.php?theme=escuro');
        }
    };

    if (toggleDiv) {
        toggleDiv.addEventListener("click", () => {
            const isLight = !html.classList.contains("light");
            applyTheme(isLight);
            localStorage.setItem("tema", isLight ? "claro" : "escuro");
        });
    }

    // Verificar tema (localStorage > session > preferência do sistema)
    const savedTheme = localStorage.getItem("tema");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === "claro") {
        applyTheme(true);
    } else if (savedTheme === "escuro") {
        applyTheme(false);
    } else if (!prefersDark) {
        applyTheme(true);
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    setupIndexCards();
    setupThemeSwitcher();

    // Animação de carregamento
    setTimeout(() => {
        if (contentWrapper) contentWrapper.style.opacity = '1';
    }, 50);
});

// Finalização do carregamento
window.addEventListener('load', () => {
    if (contentWrapper) contentWrapper.classList.remove('fade-out');
    if (pageTransition) setTimeout(() => pageTransition.classList.remove('active'), 150);
});