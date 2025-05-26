console.log('LanguageSystem iniciando...'); // Adicione no início do constructor

class LanguageSystem {
    constructor() {
        this.translations = {};
        this.currentLang = localStorage.getItem('lang') || 'pt';
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.setupLanguageSwitcher();
        this.updatePageContent();
    }

    async loadTranslations() {
        try {
            const response = await fetch('api/get-translations.php?lang=' + this.currentLang);
            this.translations = await response.json();
        } catch (error) {
            console.error('Erro ao carregar traduções:', error);
            // Fallback para traduções embutidas se a API falhar
            this.translations = this.getFallbackTranslations();
        }
    }

    getFallbackTranslations() {
        // Implementar fallback básico se necessário
        return {
            title: "Refino Albion",
            titulo: "Selecione o Tipo de Refino",
            titulopelego: "Calculadora de Refino - Pelegos",
            titulotecido: "Calculadora de Refino - Fibras",
            minerio: "Refino de Minério",
            pelego: "Refino de Pelego",
            tecido: "Refino de Tecido",
            madeira: "Refino de Madeira",
            pedra: "Refino de Pedra",
            outros: "Outros Refinos",
            mineriodesc: "Calculadora para refino de metais e barras",
            pelegodesc: "Calculadora para refino de couros e pelegos",
            tecidodesc: "Calculadora para refino de fibras e tecidos",
            madeiradesc: "Calculadora para refino de madeiras e tábuas",
            pedradesc: "Calculadora para refino de pedras e blocos",
            outrosdesc: "Calculadora para outros refinos",
            copyright: "© 2025 Calculadora de Refino - Albion Online. Todos os direitos reservados."
            // ... outras traduções padrão
        };
    }

    setupLanguageSwitcher() {
        document.querySelectorAll(".language-selector img").forEach(btn => {
            btn.addEventListener("click", () => {
                const selectedLang = btn.getAttribute("data-lang");
                this.switchLanguage(selectedLang);
            });
        });
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('lang', lang);

        // Atualizar conteúdo da página
        this.updatePageContent();

        // Atualizar formulários se existirem
        if (typeof rebuildForm === 'function') {
            rebuildForm(lang);
        }

        // Sincronizar com o servidor
        this.syncLanguageWithServer(lang);
    }

    updatePageContent() {
        const elements = {
            title: document.getElementById("title"),
            titulo: document.getElementById("titulo"),
            // titulopelego: document.getElementById("titulopelego"), // Geralmente em páginas específicas
            // titulotecido: document.getElementById("titulotecido"), // Geralmente em páginas específicas
            minerio: document.getElementById("minerio"), // Corrigido de 'mineiro' para 'minerio' para corresponder ao HTML
            pelego: document.getElementById("pelego"),
            tecido: document.getElementById("tecido"),
            madeira: document.getElementById("madeira"),
            pedra: document.getElementById("pedra"),
            outros: document.getElementById("outros"),
            mineriodesc: document.getElementById("mineriodesc"),
            pelegodesc: document.getElementById("pelegodesc"),
            tecidodesc: document.getElementById("tecidodesc"),
            madeiradesc: document.getElementById("madeiradesc"),
            pedradesc: document.getElementById("pedradesc"),
            outrosdesc: document.getElementById("outrosdesc"),
            copyright: document.getElementById("copyright"),
        };

        if (this.translations && this.translations.main) {
            for (const [key, element] of Object.entries(elements)) {
                if (element && this.translations.main[key]) {
                    element.textContent = this.translations.main[key];
                } else if (element && this.translations[key]) {
                    // Fallback para caso a chave esteja no nível raiz (menos provável com a API atual)
                    element.textContent = this.translations[key];
                }
            }
        } else {
            console.warn('Traduções principais (main) não encontradas em language-system.js');
        }

        for (const [key, element] of Object.entries(elements)) {
            if (element && this.translations[key]) {
                element.textContent = this.translations[key];
            }
        }
    }

    syncLanguageWithServer(lang) {
        // Implementar chamada AJAX para sincronizar idioma com o servidor
        fetch('api/set-language.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lang: lang })
        }).catch(error => console.error('Error syncing language:', error));
    }

    t(key, category = 'main') {
        if (this.translations && this.translations[category] && this.translations[category][key]) {
            return this.translations[category][key];
        }
        // Fallback para o caso de não encontrar em 'main' ou 'form', ou se a estrutura não for a esperada
        if (this.translations && this.translations[key]) {
            return this.translations[key]; // Para compatibilidade com chaves no nível raiz, se houver
        }
        return key; // Retorna a chave se não encontrar a tradução
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    window.languageSystem = new LanguageSystem();
});

// E no final do arquivo:
document.dispatchEvent(new Event('languageSystemReady'));
console.log('LanguageSystem pronto e evento disparado');