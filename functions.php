<?php
session_start();

// Configurações iniciais
define('DEFAULT_LANG', 'pt');

// Sistema de tradução
$translations = [
    'pt' => [
        'title' => "Refino Albion",
        'titulo' => "Selecione o Tipo de Refino",
        'titulopelego' => "Calculadora de Refino - Pelegos",
        'titulotecido' => "Calculadora de Refino - Fibras",
        'titulominerio' => "Calculadora de Refino - Minérios",
        'titulomadeira' => "Calculadora de Refino - Madeiras",
        'titulopedra' => "Calculadora de Refino - Pedras",
        'minerio' => "Refino de Minério",
        'pelego' => "Refino de Pelego",
        'tecido' => "Refino de Tecido",
        'madeira' => "Refino de Madeira",
        'pedra' => "Refino de Pedra",
        'outros' => "Outros Refinos",
        'mineriodesc' => "Calculadora para refino de metais e barras",
        'pelegodesc' => "Calculadora para refino de couros e pelegos",
        'tecidodesc' => "Calculadora para refino de fibras e tecidos",
        'madeiradesc' => "Calculadora para refino de madeiras e tábuas",
        'pedradesc' => "Calculadora para refino de pedras e blocos",
        'outrosdesc' => "Calculadora para outros refinos",
        'copyright' => "© 2025 Calculadora de Refino - Albion Online. Todos os direitos reservados."
    ],
    'en' => [
        'title' => "Albion Refinement",
        'titulo' => "Select Refining Type",
        'titulopelego' => "Refining Calculator - Leathers",
        'titulotecido' => "Refining Calculator - Fibers",
        'titulominerio' => "Refining Calculator - Minerals",
        'titulomadeira' => "Refining Calculator - Timber",
        'titulopedra' => "Refining Calculator - Stones",
        'minerio' => "Ore Refining",
        'pelego' => "Leather Refining",
        'tecido' => "Cloth Refining",
        'madeira' => "Wood Refining",
        'pedra' => "Stone Refining",
        'outros' => "Other Refinements",
        'mineriodesc' => "Calculator for refining metals and bars",
        'pelegodesc' => "Calculator for refining leather and hides",
        'tecidodesc' => "Calculator for refining fibers and clothes",
        'madeiradesc' => "Calculator for refining wood and boards",
        'pedradesc' => "Calculator for stone and blocks",
        'outrosdesc' => "Other Refinements",
        'copyright' => "© 2025 Refining Calculator - Albion Online. All rights reserved."
    ],
    'es' => [
        'title' => "Refinamiento de Albion",
        'titulo' => "Seleccionar el tipo de refinación",
        'titulopelego' => "Calculadora de refinación - Cuero",
        'titulotecido' => "Calculadora de refinación - Fibras",
        'titulominerio' => "Calculadora de refinación - minerales",
        'titulomadeira' => "Calculadora de refinación - Madera",
        'titulopedra' => "Calculadora de refinación - Piedras",
        'minerio' => "Refinación de minerales",
        'pelego' => "Refinación del cuero",
        'tecido' => "Refinación de tejidos",
        'madeira' => "Refinación de madera",
        'pedra' => "Refinación de piedras",
        'outros' => "Otros refinamientos",
        'mineriodesc' => "Calculadora para refinar metales y barras",
        'pelegodesc' => "Calculadora para refinar cueros y pieles",
        'tecidodesc' => "Calculadora para refinar fibras y tejidos",
        'madeiradesc' => "Calculadora para refinar madera y tableros",
        'pedradesc' => "Calculadora de refinación de piedras y bloques",
        'outrosdesc' => "Otros refinamientos",
        'copyright' => "© 2025 Calculadora de refinación - Albion Online. Reservados todos los derechos."
    ]
];

// Obter idioma atual
function getCurrentLang() {
    global $translations;
    
    // Verificar parâmetro URL
    if (isset($_GET['lang']) && array_key_exists($_GET['lang'], $translations)) {
        $_SESSION['lang'] = $_GET['lang'];
        return $_GET['lang'];
    }
    
    // Verificar sessão
    if (isset($_SESSION['lang'])) {
        return $_SESSION['lang'];
    }
    
    // Idioma padrão
    return DEFAULT_LANG;
}

// Função de tradução
function t($key) {
    global $translations;
    $lang = getCurrentLang();
    
    return $translations[$lang][$key] ?? $key;
}

// Configuração do tema
function getTheme() {
    return $_SESSION['theme'] ?? 'dark';
}

function setTheme($theme) {
    if (in_array($theme, ['light', 'dark'])) {
        $_SESSION['theme'] = $theme;
    }
}