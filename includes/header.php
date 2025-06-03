<?php include_once 'config/languages.php'; ?>
<?php $pageTitle = "Refino"; ?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo $pageTitle; ?> - Albion Online</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/style.css">
    <?php if (basename($_SERVER['PHP_SELF']) == 'index.php'): ?>
        <link rel="stylesheet" href="css/style2.css">
    <?php endif; ?>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon.png">
    <script>
        // Passa as traduções do PHP para o JavaScript
        window.translations = <?php echo json_encode($translations); ?>;
        window.currentLang = '<?php echo $lang; ?>';
    </script>
    <link rel="preload" href="img/minerio.webp" as="image">
    <link rel="preload" href="img/pelego.webp" as="image">
    <link rel="preload" href="img/tecido.webp" as="image">
    <link rel="preload" href="img/pedra.webp" as="image">
    <link rel="preload" href="img/madeira.webp" as="image">
    <link rel="preload" href="img/outros.webp" as="image">
</head>

<body
    class="p-6 font-sans min-h-screen <?php echo (basename($_SERVER['PHP_SELF']) == 'index.php' ? 'bg-gray-900 text-white' : ''); ?>">
    <div id="pageTransition" class="page-transition">
        <span class="loader"></span>
    </div>

    <header
        class="navbar sticky top-0 z-50 <?php echo (basename($_SERVER['PHP_SELF']) == 'index.php' ? 'bg-gray-800' : 'bg-gray-900'); ?> text-white shadow-md py-4 px-6 mb-10">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold flex items-center">
                <i class="fas <?php
                $currentPage = basename($_SERVER['PHP_SELF']);
                if ($currentPage == 'tecido.php' || $currentPage == 'pelego.php') {
                    echo 'fa-scroll';
                } else {
                    echo 'fa-industry';
                }
                ?> mr-2 text-yellow-300"></i>
                <span id="title" class="text-white"></span>
            </h1>
            <div class="language-selector" style="display: flex; align-items: center; gap: 10px;">
                <img src="img/br.png" alt="Português" data-lang="pt">
                <img src="img/us.png" alt="English" data-lang="en">
                <img src="img/es.png" alt="Español" data-lang="es">
            </div>
            <?php
            $currentPage = basename($_SERVER['PHP_SELF']);
            if ($currentPage == 'index.php' || $currentPage == 'tecido.php' || $currentPage == 'pelego.php'):
                ?>
                <div id="toggle-theme"
                    class="theme-switch cursor-pointer w-14 h-8 rounded-full flex items-center px-1 transition duration-300 border border-gray-400 bg-gray-700">
                    <div
                        class="switch-handle w-6 h-6 bg-white rounded-full transition-transform duration-300 transform flex items-center justify-center">
                        <i id="theme-icon" class="fas fa-moon text-gray-900 text-sm"></i>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </header>
</body>
<?php
$currentPage = basename($_SERVER['PHP_SELF']);
if ($currentPage == 'tecido.php' || $currentPage == 'pelego.php'):
    ?>
    <div class="max-w-6xl mx-auto mb-6 px-4">
        <button onclick="window.location.href = 'index.php'"
            class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
            <i class="fas fa-arrow-left mr-2"></i> Voltar
        </button>
    </div>
    <div id="barra-progresso" class="fixed top-0 left-0 w-0 h-1 bg-blue-500 z-50 transition-all duration-300 ease-out">
    </div>
<?php endif; ?>