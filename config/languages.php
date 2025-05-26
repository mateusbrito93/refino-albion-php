<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$translations = include 'translations.php';

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
    return 'pt';
}

function t($key, $category = 'main') {
    global $translations;
    $lang = getCurrentLang();
    
    if ($category === 'form') {
        return $translations['form'][$lang][$key] ?? $key;
    }
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