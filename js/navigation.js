class NavigationSystem {
    constructor() {
        this.pageTransition = document.getElementById('pageTransition');
        this.contentWrapper = document.getElementById('contentWrapper');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
    }

    setupEventListeners() {
        // Configura cards de refino
        document.querySelectorAll('.card-refino').forEach(card => {
            const onclickAttr = card.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/redirecionar\s*\(\s*'([^']+)'\s*\)/);
                if (match && match[1]) {
                    const targetName = match[1];
                    const pageUrl = targetName.endsWith('.php') ? targetName : `${targetName}.php`;
                    
                    card.onclick = (e) => {
                        e.preventDefault();
                        this.navigateTo(pageUrl);
                    };
                }
            }
        });

        // Configura botão de voltar
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.onclick = (e) => {
                e.preventDefault();
                this.navigateTo('index.php');
            };
        }
    }

    navigateTo(pageUrl) {
        if (!pageUrl || pageUrl === '#') return;

        if (this.pageTransition) {
            this.pageTransition.classList.add('active');
        }
        if (this.contentWrapper) {
            this.contentWrapper.classList.add('fade-out');
        }

        setTimeout(() => {
            window.location.href = pageUrl;
        }, 300);
    }

    setupTheme() {
        const toggleDiv = document.getElementById("toggle-theme");
        const themeIcon = document.getElementById("theme-icon");
        const html = document.documentElement;

        const applyTheme = (theme) => {
            if (theme === 'light') {
                html.classList.add("light");
                if (themeIcon) {
                    themeIcon.classList.remove("fa-moon");
                    themeIcon.classList.add("fa-sun");
                }
            } else {
                html.classList.remove("light");
                if (themeIcon) {
                    themeIcon.classList.remove("fa-sun");
                    themeIcon.classList.add("fa-moon");
                }
            }
            localStorage.setItem("tema", theme);
            // Enviar para o PHP via AJAX ou cookie
            this.syncThemeWithServer(theme);
        };

        if (toggleDiv) {
            toggleDiv.addEventListener("click", () => {
                const newTheme = html.classList.contains("light") ? 'dark' : 'light';
                applyTheme(newTheme);
            });
        }

        const savedTheme = localStorage.getItem("tema") || 'dark';
        applyTheme(savedTheme);
    }

    syncThemeWithServer(theme) {
        // Implementar chamada AJAX para sincronizar tema com o servidor
        // Isso pode ser feito via fetch() para um endpoint PHP que atualiza a sessão
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    new NavigationSystem();
});

// Tratamento do carregamento da página
window.addEventListener('load', () => {
    const contentWrapper = document.getElementById('contentWrapper');
    const pageTransition = document.getElementById('pageTransition');
    
    if (contentWrapper) {
        contentWrapper.classList.remove('fade-out');
        contentWrapper.style.opacity = '1';
    }
    if (pageTransition) {
        setTimeout(() => {
            pageTransition.classList.remove('active');
        }, 150);
    }
});