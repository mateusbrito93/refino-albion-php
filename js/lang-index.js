// 1. Defina os elementos a serem traduzidos
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

// 2. Função de tradução
function updateLanguage(lang) {
  const translation = window.translations[lang];
  if (!translation) {
    console.error(`Idioma '${lang}' não encontrado nas traduções.`);
    return;
  }

  Object.keys(elementsToTranslate).forEach(key => {
    if (elementsToTranslate[key] && translation[key]) {
      elementsToTranslate[key].textContent = translation[key];
    }
  });
}

// 3. Evento de troca de idioma
document.querySelectorAll(".language-selector img").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedLang = btn.getAttribute("data-lang");
    localStorage.setItem("lang", selectedLang);
    updateLanguage(selectedLang);
    if (window.languageSystem) {
      window.languageSystem.setLanguage(selectedLang);
    }
  });
});

// 4. Idioma inicial
const currentLang = localStorage.getItem('lang') || 'pt';
updateLanguage(currentLang);
if (window.languageSystem) {
  window.languageSystem.setLanguage(currentLang);
}