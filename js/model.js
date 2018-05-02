
var pasos = [];
var imagen = new Image();
var posX = 0;
var posY =0;

const activa = "#fff"; //casilla activada
const bloqueada = "#00f"; //casilla en la que no se puede pasar
const inactiva = "#999"; //casilla que se necesita activar
const neutral = "#f00"; //casilla que se puede pasar pero no se puede activar


var tablero1 = [
	[neutral,neutral,neutral,inactiva,neutral],
	[neutral,bloqueada,neutral,neutral,neutral],
	[neutral,neutral,neutral,neutral,neutral]
];

var tablero2 = [
	[neutral,neutral,neutral,neutral,neutral],
	[neutral,neutral,neutral,neutral,neutral],
	[neutral,neutral,neutral,neutral,neutral],
	[neutral,neutral,neutral,neutral,neutral],
	[neutral,neutral,neutral,neutral,neutral],
	[neutral,neutral,neutral,neutral,neutral],
	[neutral,neutral,neutral,neutral,neutral],
];

function addAvanzar(){
	var option = document.createElement("option");
	option.text = "Avanzar";
	myGamePiece.Avanzar();
    lista.add(option);
    pasos.push(1);
}

function addGirarH(){
	var option = document.createElement("option");
	option.text = "Girar Horario";
	myGamePiece.GirarHorario();
    lista.add(option);
    pasos.push(1);
}

function addGirarA(){
	var option = document.createElement("option");
	option.text = "Girar";
	myGamePiece.GirarAntihorario();
    lista.add(option);
    pasos.push(4);
}

function addAlumbrar(){
	var option = document.createElement("option");
	option.text = "Alumbrar";
	myGamePiece.Activar();
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
	myGamePiece = new component(tablero1, 0, 0);
	myGameArea.start();
}

function ejecutarcomandos(){
	if(pasos.length == 0)
	{
		alert("Seleccione la serie de pasos a ejecutar");
	}
	else
	{
		console.log(pasos[0]);
	}
}

function detenernivel(){
	console.log("oprimi avanzar");
}

function reiniciar(){
	console.log("oprimi avanzar");
}

function addMovement(tipo){
	console.log(tipo);
}

var myGameArea = {
    start : function() {
        this.x = 5;
		this.y = 5;
        context = canvas.getContext("2d");
		this.interval = setInterval(updateGameArea, 100);
		for(var i = 0; i < 3; i++){
			for(var j = 0; j<5; j++){
				context.fillStyle=tablero1[i][j];
				context.fillRect(this.x, this.y, 50, 40);
				this.x += 60;
			}
			this.y += 50;
			this.x = 5;
		}
    },
    clear : function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		this.x = 5;
		this.y = 5;
		for(var i = 0; i < 3; i++){
			for(var j = 0; j<5; j++){
				context.fillStyle=tablero1[i][j];
				context.fillRect(this.x, this.y, 50, 40);
				this.x += 60;
			}
			this.y += 50;
			this.x = 5;
		}
    }
}

function updateGameArea() {
	myGameArea.clear();
	myGamePiece.newPos();
    myGamePiece.update();
}

function component(tbl, x, y) {
	this.imagen = new Image();
	this.imagen.src = "img/derecha.png";
	this.direccion = "oriente";
	this.tablero = tbl;
	this.i = 0;
	this.x = x;
	this.y = y;
	this.width = 50;
	this.length = 20;
    this.update = function() {	
		context.drawImage(this.imagen,posX+5,posY+5,this.width,this.length);
	}
	this.newPos = function(){
		if(this.i <= 10){
			posX = posX + (this.x*60-posX)/60*6*this.i;
			posY = posY + (this.y*50-posY)/50*5*this.i;
			this.i++;
		}
	}
    this.GirarHorario = function(){
		switch (this.direccion){
            case "norte":
				this.direccion = "oriente";
				this.imagen.src ="img/derecha.png"
				this.width = 50;
				this.length = 20;
                break;
            case "oriente":
				this.direccion = "sur";
				this.imagen.src ="img/abajo.png"
				this.width = 20;
				this.length = 30;
                break;
            case "sur":
				this.direccion = "occidente";
				this.imagen.src ="img/izquierda.png"
				this.width = 50;
				this.length = 20;
                break;
            case "occidente":
				this.direccion = "norte";
				this.imagen.src ="img/arriba.png"
				this.width = 20;
				this.length = 30;
                break;
        }
	}
	this.GirarAntihorario = function(){
		switch (this.direccion){
            case "norte":
				this.direccion = "occidente";
                this.imagen.src ="img/izquierda.png"
				this.width = 50;
				this.length = 20;
                break;
            case "occidente":
				this.direccion = "sur";
                this.imagen.src ="img/abajo.png"
				this.width = 20;
				this.length = 30;
                break;
            case "sur":
				this.direccion = "oriente";
                this.imagen.src ="img/derecha.png"
				this.width = 50;
				this.length = 20;
                break;
            case "oriente":
				this.direccion = "norte";
                this.imagen.src ="img/arriba.png"
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
		this.tablero[this.y][this.x] = (this.tablero[this.y][this.x] == inactiva)?activa:
			this.tablero[this.y][this.x];
	}
}

