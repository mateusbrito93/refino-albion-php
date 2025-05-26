<?php
$pageTitle = t('titulotecido');
include 'includes/header.php';
?>

<main class="max-w-6xl mx-auto" id="contentWrapper">
    <h2 class="text-3xl font-bold text-white mb-6">
        <i class="fas fa-calculator mr-2"></i>
        <span id="titulotecido"><?php echo t('titulotecido'); ?></span>
    </h2>

    <div class="max-w-6xl mx-auto mb-6 px-4">
        <button class="back-button bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
            <i class="fas fa-arrow-left mr-2"></i> <?php echo t('voltar'); ?>
        </button>
    </div>

    <div id="barra-progresso" class="fixed top-0 left-0 w-0 h-1 bg-blue-500 z-50 transition-all duration-300 ease-out"></div>

    <div class="bg-gray-800 shadow-xl rounded-lg p-8 mb-8">
        <div id="form-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"></div>
    </div>

    <div id="resultado" class="bg-gray-800 rounded-lg p-6 shadow-xl"></div>
</main>

<?php include 'includes/footer.php'; ?>