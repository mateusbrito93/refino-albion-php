// Transição de página
const pageTransition = document.getElementById('pageTransition');
const contentWrapper = document.getElementById('contentWrapper');

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

    setTimeout(() => {
        if (contentWrapper) contentWrapper.style.opacity = '1';
    }, 50);
});

window.addEventListener('load', () => {
    if (contentWrapper) contentWrapper.classList.remove('fade-out');
    if (pageTransition) setTimeout(() => pageTransition.classList.remove('active'), 150);
});