<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/languages.php';

$lang = isset($_GET['lang']) ? $_GET['lang'] : getCurrentLang();
$translations = include __DIR__ . '/../config/translations.php';

$response = [
    'main' => $translations[$lang] ?? [],
    'form' => $translations['form'][$lang] ?? []
];

echo json_encode($response);