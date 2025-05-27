// Elementos que precisam de tradução
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

// Função para obter traduções do formulário
function getFormTranslations(lang) {
  return {
    tier: window.translations[lang]?.form_tier || 'Tier',
    encantamento: window.translations[lang]?.form_encantamento || 'Encantamento',
    cidadeCompraFibra: window.translations[lang]?.form_cidadeCompraFibra || 'Cidade de Compra (Fibra)',
    cidadeVendaTecido: window.translations[lang]?.form_cidadeVendaTecido || 'Cidade de Venda (Tecido)',
    quantidade: window.translations[lang]?.form_quantidade || 'Quantidade',
    taxaImposto: window.translations[lang]?.form_taxaImposto || 'Taxa de Imposto',
    taxaRetorno: window.translations[lang]?.form_taxaRetorno || 'Taxa de Retorno',
    calcular: window.translations[lang]?.form_calcular || 'Calcular'
  };
}

// Função para trocar idioma
function updateLanguage(lang) {
  const translation = window.translations[lang];
  if (!translation) {
    console.error(`Idioma '${lang}' não encontrado nas traduções.`);
    return;
  }

  // Atualiza todos os elementos
  Object.keys(elementsToTranslate).forEach(key => {
    if (elementsToTranslate[key] && translation[key]) {
      elementsToTranslate[key].textContent = translation[key];
    }
  });
}

function rebuildForm(lang = 'pt') {
  if (typeof buildFormWithLang === 'function') {
    buildFormWithLang(getFormTranslations(lang));
  }
}

// Evento de clique nas bandeiras
document.querySelectorAll(".language-selector img").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedLang = btn.getAttribute("data-lang");
    localStorage.setItem("lang", selectedLang);
    updateLanguage(selectedLang);
    rebuildForm(selectedLang);

    // Atualiza a página para aplicar as mudanças no PHP também
    const url = new URL(window.location.href);
    url.searchParams.set('lang', selectedLang);
    window.location.href = url.toString();
  });
});

// Idioma inicial
updateLanguage(window.currentLang || 'pt');
rebuildForm(window.currentLang || 'pt');