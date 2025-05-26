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
        // Atualizar elementos da página com as traduções
        const elements = {
            title: document.getElementById("title"),
            titulo: document.getElementById("titulo"),
            titulopelego: document.getElementById("titulopelego"),
            titulotecido: document.getElementById("titulotecido"),
            mineiro: document.getElementById("mineiro"),
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
            // ... todos os outros elementos que precisam de tradução
        };

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

    t(key) {
        return this.translations[key] || key;
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    window.languageSystem = new LanguageSystem();
});

// E no final do arquivo:
document.dispatchEvent(new Event('languageSystemReady'));
console.log('LanguageSystem pronto e evento disparado');