// Elementos para a transição de página
const pageTransition = document.getElementById('pageTransition');
const contentWrapper = document.getElementById('contentWrapper'); // Adicione este ID ao seu contêiner principal de conteúdo se não existir

/**
 * Ativa a animação de transição e redireciona o navegador para a nova URL.
 * @param {string} pageUrl A URL da página PHP para a qual navegar.
 */
function redirecionar(pageUrl) {
    if (pageUrl && pageUrl !== '#') {
        if (pageTransition) {
            pageTransition.classList.add('active'); // Mostra o loader
        }
        if (contentWrapper) {
            contentWrapper.classList.add('fade-out'); // Esmaece o conteúdo atual (adicione CSS para .fade-out)
        }

        // Atraso para permitir que a animação de fade-out e o loader apareçam
        setTimeout(() => {
            window.location.href = pageUrl; // Navegação HTTP normal para a página PHP
        }, 300); // Ajuste este tempo para corresponder à sua animação CSS
    } else {
        console.warn("Tentativa de redirecionar para '#' ou URL inválida.");
    }
}

/**
 * Configura os cards da página inicial para usar a função `redirecionar`.
 * Esta função modifica o comportamento padrão dos `onclick` definidos no HTML.
 */
function setupIndexCards() {
    document.querySelectorAll('.card-refino').forEach(card => {
        const onclickAttr = card.getAttribute('onclick'); // Lê o atributo onclick original
        if (onclickAttr) {
            // Tenta extrair o destino da função redirecionar('destino') original
            const match = onclickAttr.match(/redirecionar\s*\(\s*'([^']+)'\s*\)/);
            if (match && match[1]) {
                let targetName = match[1]; // Ex: 'tecido', 'pelego'

                if (targetName !== '#') {
                    // Constrói a URL final da página .php
                    // Se o targetName já for 'pagina.php', não adiciona .php novamente.
                    const pageUrl = targetName.endsWith('.php') ? targetName : `${targetName}.php`;

                    card.onclick = (e) => {
                        e.preventDefault(); // Previne a ação padrão do onclick original, se houver
                        redirecionar(pageUrl);
                    };
                } else {
                    // Para links '#', previne a ação e loga um aviso, ou pode ter um comportamento customizado.
                    card.onclick = (e) => {
                        e.preventDefault();
                        console.warn(`Navegação para '#' no card não configurada. Atributo onclick original: ${onclickAttr}`);
                    };
                }
            }
        }
    });
}

// Garante que o DOM esteja carregado antes de configurar os cards
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupIndexCards);
} else {
    setupIndexCards(); // Se o DOM já estiver carregado
}

// Oculta o loader e mostra o conteúdo quando a nova página (PHP) terminar de carregar
window.addEventListener('load', () => {
    if (contentWrapper) {
        contentWrapper.classList.remove('fade-out'); // Garante que a classe de fade-out seja removida
        // Força um reflow para garantir que a transição de opacidade funcione ao carregar
        // void contentWrapper.offsetWidth; // Comentado pois pode não ser sempre necessário, testar.
        contentWrapper.style.opacity = '1'; // Torna o conteúdo visível (adicione CSS para transição de opacidade)
    }
    if (pageTransition) {
        // Um pequeno atraso para garantir que o conteúdo seja renderizado antes de remover o loader,
        // e para dar tempo para a transição de opacidade do contentWrapper.
        setTimeout(() => {
            pageTransition.classList.remove('active'); // Esconde o loader
        }, 150); // Ajuste conforme necessário
    }
});

// Efeito de transição ao usar os botões voltar/avançar.
// window.addEventListener('popstate', function(event) {
//     // Lógica opcional para transição ao usar botões de histórico do navegador
//     // Por exemplo, ativar a transição e deixar o navegador carregar:
//     // if (pageTransition) pageTransition.classList.add('active');
//     // O reload não é ideal aqui, pois o navegador já está indo para a página correta.
// });