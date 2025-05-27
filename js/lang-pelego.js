window.languageSystem = {
  lang: localStorage.getItem('lang') || 'pt',

  setLanguage: function (lang) {
    if (!window.translations[lang]) {
      console.warn(`Idioma '${lang}' não encontrado.`);
      return;
    }

    this.lang = lang;
    localStorage.setItem('lang', lang);
    this.updateStaticTexts();
    document.dispatchEvent(new Event('languageChanged'));
  },

  getTranslations: function (section) {
    const t = window.translations[this.lang] || {};
    if (section === 'form') {
      return {
        tier: t.form_tier || "Tier",
        encantamento: t.form_encantamento || "Encantamento",
        cidadeCompra: t.form_cidadeCompraPelego || "Cidade de Compra (Pelego)",
        cidadeVenda: t.form_cidadeVendaCouro || "Cidade de Venda (Couro)",
        quantidade: t.form_quantidade || "Quantidade",
        taxaImposto: t.form_taxaImposto || "Taxa de Imposto",
        taxaRetorno: t.form_taxaRetorno || "Taxa de Retorno",
        calcular: t.form_calcular || "Calcular",
        todos_beta: t.form_todos_beta || "Todos (BETA)",
        aviso_todos_tiers: t.form_aviso_todos_tiers || "Encantamento aplicado apenas para T4+"
      };
    }
    return {};
  },

  updateStaticTexts: function () {
    const translation = window.translations[this.lang];
    if (!translation) return;

    const elementsToTranslate = {
      title: document.getElementById("title"),
      titulo: document.getElementById("titulo"),
      titulopelego: document.getElementById("titulopelego"),
      titulotecido: document.getElementById("titulotecido"),
      minerio: document.getElementById("minerio"),
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
      copyright: document.getElementById("copyright")
    };

    Object.keys(elementsToTranslate).forEach(key => {
      if (elementsToTranslate[key] && translation[key]) {
        elementsToTranslate[key].textContent = translation[key];
      }
    });
  }
};

// Evento de clique nas bandeiras
document.querySelectorAll(".language-selector img").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedLang = btn.getAttribute("data-lang");
    window.languageSystem.setLanguage(selectedLang);
  });
});

// Inicialização automática com idioma salvo
window.languageSystem.setLanguage(window.languageSystem.lang);