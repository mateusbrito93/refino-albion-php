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

// Evento de clique nas bandeiras
document.querySelectorAll(".language-selector img").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedLang = btn.getAttribute("data-lang");
    localStorage.setItem("lang", selectedLang);
    updateLanguage(selectedLang);
    if (typeof rebuildForm === 'function') {
      rebuildForm(selectedLang);
    }

    // Atualiza a página para aplicar as mudanças no PHP também
    const url = new URL(window.location.href);
    url.searchParams.set('lang', selectedLang);
    window.location.href = url.toString();
  });
});

// Idioma inicial
updateLanguage(window.currentLang);