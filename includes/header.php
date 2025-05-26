<?php include_once 'config/languages.php'; ?>
<?php $pageTitle = t('title'); ?>
<!DOCTYPE html>
<html lang="<?php echo getCurrentLang(); ?>">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $pageTitle; ?> - Albion Online</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon.png">
    
    <?php if (basename($_SERVER['PHP_SELF']) == 'index.php'): ?>
        <link rel="stylesheet" href="css/style2.css">
    <?php endif; ?>
</head>

<body class="p-6 font-sans min-h-screen bg-gray-900 text-white <?php echo getTheme() === 'light' ? 'light' : ''; ?>">
    <div id="pageTransition" class="page-transition">
        <span class="loader"></span>
    </div>
    <header class="navbar sticky top-0 z-50 bg-gray-800 text-white shadow-md py-4 px-6 mb-10">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold flex items-center">
                <i class="fas <?php
                $currentPage = basename($_SERVER['PHP_SELF']);
                echo $currentPage == 'tecido.php' || $currentPage == 'pelego.php' ? 'fa-scroll' : 'fa-industry';
                ?> mr-2 text-yellow-300"></i>
                <span id="title"><?php echo t('title'); ?></span>
            </h1>
            <div class="language-selector" style="display: flex; align-items: center; gap: 10px;">
                <img src="img/br.png" alt="Português" data-lang="pt">
                <img src="img/us.png" alt="English" data-lang="en">
                <img src="img/es.png" alt="Español" data-lang="es">
            </div>
            <?php if ($currentPage == 'tecido.php' || $currentPage == 'pelego.php'): ?>
                <div id="toggle-theme"
                    class="theme-switch cursor-pointer w-14 h-8 rounded-full flex items-center px-1 transition duration-300 border border-gray-400 bg-gray-700">
                    <div
                        class="switch-handle w-6 h-6 bg-white rounded-full transition-transform duration-300 transform flex items-center justify-center">
                        <i id="theme-icon" class="fas <?php echo getTheme() === 'light' ? 'fa-sun' : 'fa-moon'; ?> text-gray-900 text-sm"></i>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </header>