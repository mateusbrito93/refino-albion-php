// Transição de página
const pageTransition = document.getElementById('pageTransition');
const contentWrapper = document.getElementById('contentWrapper');

// Função para aplicar o tema
function applyTheme(isLight) {
    const html = document.documentElement;
    const themeIcon = document.getElementById("theme-icon");

    if (isLight) {
        html.classList.add("light-theme");
        if (themeIcon) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
        }
        // Força a cor do texto
        document.querySelectorAll('#title, #titulo').forEach(el => {
            el.classList.add('text-gray-800');
            el.classList.remove('text-white');
        });
    } else {
        html.classList.remove("light-theme");
        if (themeIcon) {
            themeIcon.classList.replace("fa-sun", "fa-moon");
        }
        // Restaura a cor do texto
        document.querySelectorAll('#title, #titulo').forEach(el => {
            el.classList.add('text-white');
            el.classList.remove('text-gray-800');
        });
    }
}

// Configuração inicial do tema
function initTheme() {
    const savedTheme = localStorage.getItem("tema");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Prioridade: localStorage > preferência do sistema > padrão (escuro)
    applyTheme(savedTheme === "claro" || (!savedTheme && !prefersDark));
}

// Configuração do botão de tema
function setupThemeSwitcher() {
    const toggleDiv = document.getElementById("toggle-theme");

    if (toggleDiv) {
        toggleDiv.addEventListener("click", () => {
            const isLight = !document.documentElement.classList.contains("light-theme");
            applyTheme(isLight);
            localStorage.setItem("tema", isLight ? "claro" : "escuro");
        });
    }
}

// Redirecionamento
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

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    setupIndexCards();
    initTheme();
    setupThemeSwitcher();

    setTimeout(() => {
        if (contentWrapper) contentWrapper.style.opacity = '1';
    }, 50);
});

window.addEventListener('load', () => {
    if (contentWrapper) contentWrapper.classList.remove('fade-out');
    if (pageTransition) setTimeout(() => pageTransition.classList.remove('active'), 150);
});