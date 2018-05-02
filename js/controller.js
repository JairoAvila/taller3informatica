
var lista;
var avanzar;
var girarH; 
var girarA; 
var alumbrar; 
var butonLimpiar;
var newgame;
var iniciar;
var detener;
var reiniciar;
var canvas;

window.addEventListener('load', function() {
  	inicializarBotones();
})

function inicializarBotones(){
	lista = document.getElementById("selectJugadas");
	canvas = document.getElementById("canvasTablero");
	avanzar = document.getElementById("butonAvanzar");
	avanzar.addEventListener("click", addAvanzar);
	girarH = document.getElementById("butonGirarH");
    girarH.addEventListener("click", addGirarH);
    girarA = document.getElementById("butonGirarA");
	girarA.addEventListener("click", addGirarA);
	alumbrar = document.getElementById("butonAlumbrar");
	alumbrar.addEventListener("click", addAlumbrar);
	butonLimpiar = document.getElementById("butonLimpiar");
	butonLimpiar.addEventListener("click", addLimpiar);
	newgame = document.getElementById("butonNewGame");
	newgame.addEventListener("click", cargarnivel);
	iniciar = document.getElementById("butonIniciar");
	iniciar.addEventListener("click", ejecutarcomandos);
	detener = document.getElementById("butonDetener");
	detener.addEventListener("click", detenernivel);
	reiniciar = document.getElementById("butonReiniciar");
	reiniciar.addEventListener("click", reiniciar);
}