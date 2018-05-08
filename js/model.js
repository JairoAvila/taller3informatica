
var pasos = [];
var imagen;
var posX = 0;
var posY =0;
var step =0;
var run =false;
var totalInactivas = 2;

var modo = 0;

var flag = false;

const celdInactivas = 2;
const activa = "#fff"; //casilla activada
const bloqueada = "#00f"; //casilla en la que no se puede pasar
const inactiva = "#999"; //casilla que se necesita activar
const neutral = "#f00"; //casilla que se puede pasar pero no se puede activar



var tablero = [
	[neutral,bloqueada,bloqueada,bloqueada,inactiva],
	[neutral,bloqueada,bloqueada,bloqueada,neutral],
	[neutral,inactiva,neutral,neutral,neutral]
];

function addAvanzar(){
	var option = document.createElement("option");
	option.text = "Avanzar";
	lista.add(option);
    pasos.push(0);
}

function addGirarH(){
	var option = document.createElement("option");
	option.text = "Girar Horario";
	lista.add(option);
    pasos.push(1);
}

function addGirarA(){
	var option = document.createElement("option");
	option.text = "Girar";
	lista.add(option);
    pasos.push(2);
}

function addAlumbrar(){
	var option = document.createElement("option");
	option.text = "Alumbrar";
	lista.add(option);
    pasos.push(3);
}

function addLimpiar(){
	lista.innerText = null
	pasos = [];
}


function cargarnivel(){
	avanzar.disabled = false;
	girarH.disabled = false;
	girarA.disabled = false;
	alumbrar.disabled = false;
	butonLimpiar.disabled = false;
	newgame.disabled = true;
	iniciar.disabled = false;
	detener.disabled = false;
	reiniciar.disabled = false;
	myGamePiece = new component(tablero, 0, 0);
	myGameArea.start(tablero);
}

function ejecutarcomandos(){
	if(pasos.length == 0)
	{
		alert("Seleccione la serie de pasos a ejecutar");
	}
	else
	{
		run = true;
	}
}

function nextStep(){
	if(step < pasos.length){
		switch(pasos[step]){
			case 0:
			myGamePiece.Avanzar();
			break;
			case 1:
			myGamePiece.GirarHorario();
			break;
			case 2:
			myGamePiece.GirarAntihorario();
			break;
			case 3:
			myGamePiece.Activar();
			break;
		}
		step++;
	}else{
		run = false;
	}
	if(totalInactivas == 0){
		alert("Has ganado");
		reiniciarnivel();
	}
}

function detenernivel(){
	run=false;
	console.log("oprimi avanzar");
}

function reiniciarnivel(){
	run=false;
	posX = 0;
	posY = 0;
	myGamePiece.reiniciarPos();
	myGamePiece.direccion = "oriente";
	step=0;
	totalInactivas = celdInactivas;
	console.log("oprimi iniciar");
}


function updateGameArea() {
	//myGameArea.clear();
	myGamePiece.newPos();
    myGamePiece.update();
}

function component(tbl, x, y) {
	this.imagen = loadImage("img/derecha.png");
	this.direccion = "oriente";
	this.tablero = tbl;
	this.i = 0;
	this.x = x;
	this.y = y;
	this.width = 50;
	this.length = 20;
    this.update = function() {
		image(this.imagen, posX+5,posY+60);
	}
	this.newPos = function(){
		if(run){
			if(this.i <= 10){
				posX = posX + (this.x*60-posX)/60*6*this.i;
				posY = posY + (this.y*50-posY)/50*5*this.i;
				this.i++;
			}else if(this.i == 11){
				nextStep();
			}
			butonLimpiar.disabled = true;
			iniciar.disabled = true;
			detener.disabled = false;
		}else{
			butonLimpiar.disabled = false;
			iniciar.disabled = false;
			detener.disabled = true;
		}
	}
    this.GirarHorario = function(){
		switch (this.direccion){
            case "norte":
				this.direccion = "oriente";
				this.imagen = loadImage("img/derecha.png");
				this.width = 50;
				this.length = 20;
                break;
            case "oriente":
				this.direccion = "sur";
				this.imagen = loadImage("img/abajo.png");
				this.width = 20;
				this.length = 30;
                break;
            case "sur":
				this.direccion = "occidente";
				this.imagen = loadImage("img/izquierda.png");
				this.width = 50;
				this.length = 20;
                break;
            case "occidente":
				this.direccion = "norte";
				this.imagen = loadImage("img/arriba.png");
				this.width = 20;
				this.length = 30;
                break;
        }
	}
	this.GirarAntihorario = function(){
		switch (this.direccion){
            case "norte":
				this.direccion = "occidente";
                this.imagen = loadImage("img/izquierda.png");
				this.width = 50;
				this.length = 20;
                break;
            case "occidente":
				this.direccion = "sur";
                this.imagen= loadImage("img/abajo.png");
				this.width = 20;
				this.length = 30;
                break;
            case "sur":
				this.direccion = "oriente";
                this.imagen = loadImage("img/derecha.png");
				this.width = 50;
				this.length = 20;
                break;
            case "oriente":
				this.direccion = "norte";
                this.imagen = loadImage("img/arriba.png");
				this.width = 20;
				this.length = 30;
                break;
        }
	}
	this.Avanzar = function(){
        switch (this.direccion){
            case "norte":
				this.y = (this.Mirar(this.x, this.y-1) ? this.y - 1: this.y);
				this.i = 0;
                break;
            case "oriente":
				this.x = (this.Mirar(this.x+1, this.y) ? this.x + 1 : this.x);
				this.i = 0;
                break;
            case "sur":
				this.y = (this.Mirar(this.x, this.y+1) ? this.y + 1 : this.y);
				this.i = 0;
                break;
            case "occidente":
				this.x = (this.Mirar(this.x-1, this.y) ? this.x - 1 : this.x);
				this.i = 0;
                break;
		}
	}
	this.Mirar = function(x, y){
		try{
		return (this.tablero[y][x] == neutral || this.tablero[y][x] == inactiva || 
			this.tablero[y][x] == activa)?true:false;
		}catch(err){
			return false;
		}
	}
	this.Activar = function(){ 
		if (this.tablero[this.y][this.x] == inactiva){
			this.tablero[this.y][this.x] = activa;
			totalInactivas--;
		}else{
			this.tablero[this.y][this.x];
		}
	}
	this.reiniciarPos = function(){
		this.x = 0;
		this.y = 0;
		this.imagen.src = "img/derecha.png";
		this.direccion = "oriente";
		this.width = 50;
		this.length = 20;
		for(var j = 0 ; j < this.tablero.length ; j++){
			for(var k = 0 ; k < this.tablero[0].length ; k++){
				this.tablero[j][k]=(this.tablero[j][k]==activa)?inactiva:this.tablero[j][k];
			}
		}
	}
}


var myGameArea = {
    start : function(tablero) {
		flag = true;
    },
    clear : function() {
    	modo = 2;
    }
}

function draw() {
 	if(flag){
 		background(64);
 		x = 12;
 		y = 40;
 		for(var i = 0; i < 3; i++){
 			for(var j = 0; j < 5; j++)
 			{
 				var c = color(tablero[i][j]);
 				fill(c);
 				rect(x, y, 100, 100);
 				x = x + 130;
 			}
 			x = 12;
 			y = y + 200;
		}

		updateGameArea();
 	}
}
