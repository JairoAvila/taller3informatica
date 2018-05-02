window.addEventListener('load', function() {
  inicializarBotones();
})

function inicializarBotones(){
	var avanzar = document.getElementById("butonAvanzar").addEventListener("click", funcion1);
	var girar = document.getElementById("butonGirar").addEventListener("click", funcion1);
	var alumbrar = document.getElementById("butonAlumbrar").addEventListener("click", funcion1);
	var newgame = document.getElementById("butonNewGame").addEventListener("click", funcion1);
	var iniciar = document.getElementById("butonIniciar").addEventListener("click", funcion1);
	var detener = document.getElementById("butonDetener").addEventListener("click", funcion1);
	var reiniciar = document.getElementById("butonReiniciar").addEventListener("click", funcion1);
	var butonLimpiar = document.getElementById("butonLimpiar").addEventListener("click", funcion1);
}

