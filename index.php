<?php
$pageTitle = "Seleção de Refino"; // Título específico para esta página
include 'includes/header.php';
?>

<main class="max-w-6xl mx-auto">
  <h2 class="text-3xl font-bold text-center mb-10">
    <i class="fas fa-chess-queen mr-2"></i><span id="titulo" class="text-center text-white mt-2"></span>
  </h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="card-refino bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer"
      onclick="redirecionar('minerio')">
      <div class="flex flex-col items-center text-center">
        <img src="img/minerio.webp" alt="Minério" class="h-24 mb-4 img-circular">
        <h3 class="text-xl font-bold mb-2 text-blue-300" id="minerio"></h3>
        <p class="text-gray-400" id="mineriodesc"></p>
      </div>
    </div>
    <div class="card-refino bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer"
      onclick="redirecionar('pelego')">
      <div class="flex flex-col items-center text-center">
        <img src="img/pelego.webp" alt="Pelego" class="h-24 mb-4 img-circular">
        <h3 class="text-xl font-bold mb-2 text-orange-300" id="pelego"></h3>
        <p class="text-gray-400" id="pelegodesc"></p>
      </div>
    </div>
    <div class="card-refino bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer"
      onclick="redirecionar('tecido')">
      <div class="flex flex-col items-center text-center">
        <img src="img/tecido.webp" alt="Tecido" class="h-24 mb-4 img-circular">
        <h3 class="text-xl font-bold mb-2 text-purple-300" id="tecido"></h3>
        <p class="text-gray-400" id="tecidodesc"></p>
      </div>
    </div>
    <div class="card-refino bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer"
      onclick="redirecionar('madeira')">
      <div class="flex flex-col items-center text-center">
        <img src="img/madeira.webp" alt="Madeira" class="h-24 mb-4 img-circular">
        <h3 class="text-xl font-bold mb-2 text-green-300" id="madeira"></h3>
        <p class="text-gray-400" id="madeiradesc"></p>
      </div>
    </div>
    <div class="card-refino bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer"
      onclick="redirecionar('pedra')">
      <div class="flex flex-col items-center text-center">
        <img src="img/pedra.webp" alt="Pedra" class="h-24 mb-4 img-circular">
        <h3 class="text-xl font-bold mb-2 text-gray-300" id="pedra"></h3>
        <p class="text-gray-400" id="pedradesc"></p>
      </div>
    </div>
    <div class="card-refino bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer"
      onclick="redirecionar('#')">
      <div class="flex flex-col items-center text-center">
        <img src="img/outros.webp" alt="Outros" class="h-24 mb-4 img-circular">
        <h3 class="text-xl font-bold mb-2 text-red-300" id="outros"></h3>
        <p class="text-gray-400" id="outrosdesc"></p>
      </div>
    </div>
  </div>
</main>

<?php include 'includes/footer.php'; ?>