</div>
<footer class="mt-12 py-4 border-t border-gray-700 text-center text-gray-400">
    <div class="max-w-6xl mx-auto px-4">
        <p class="text-sm" id="copyright"></p>
        <p class="text-xs mt-1">
            By <span class="text-blue-300"><a href="https://www.linkedin.com/in/mateus-brito-071b1366/"
                    target="_blank">Mateus Brito</a></span>
        </p>
    </div>
</footer>

<?php if (basename($_SERVER['PHP_SELF']) == 'index.php'): ?>
    <script src="js/theme.js"></script>
    <script src="js/script-index.js"></script>
    <script src="js/lang-index.js"></script>
<?php elseif (basename($_SERVER['PHP_SELF']) == 'tecido.php'): ?>
    <script src="js/theme.js"></script>
    <script src="js/lang-tecido.js"></script>
    <script src="js/script-tecido.js"></script>
    <script src="js/form-builder-tecido.js"></script>
<?php elseif (basename($_SERVER['PHP_SELF']) == 'pelego.php'): ?>
    <script src="js/theme.js"></script>
    <script src="js/lang-pelego.js"></script>
    <script src="js/script-pelego.js"></script>
    <script src="js/form-builder-pelego.js"></script>
<?php elseif (basename($_SERVER['PHP_SELF']) == 'minerio.php'): ?>
    <script src="js/theme.js"></script>
    <script src="js/lang-minerio.js"></script>
    <script src="js/script-minerio.js"></script>
    <script src="js/form-builder-minerio.js"></script>
<?php elseif (basename($_SERVER['PHP_SELF']) == 'madeira.php'): ?>
    <script src="js/theme.js"></script>
    <script src="js/lang-madeira.js"></script>
    <script src="js/script-madeira.js"></script>
    <script src="js/form-builder-madeira.js"></script>
<?php elseif (basename($_SERVER['PHP_SELF']) == 'pedra.php'): ?>
    <script src="js/theme.js"></script>
    <script src="js/lang-pedra.js"></script>
    <script src="js/script-pedra.js"></script>
    <script src="js/form-builder-pedra.js"></script>
<?php endif; ?>
</body>

</html>