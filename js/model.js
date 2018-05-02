var pasos = [];
var imagen = new Image();
var activa = "#fff"; //casilla activada
var bloqueada = "#00f"; //casilla en la que no se puede pasar
var inactiva = "#999"; //casilla que se necesita activar
var neutral = "#f00"; //casilla que se puede pasar pero no se puede activar

var tablero1 = [
	[neutral,neutral,neutral,inactiva,neutral],
	[neutral,neutral,neutral,neutral,neutral],
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
    lista.add(option);
    pasos.push(1);
}

function addGirar(){
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
	girar.disabled = false;
	alumbrar.disabled = false;
	butonLimpiar.disabled = false;
	newgame.disabled = true;
	iniciar.disabled = false;
	detener.disabled = false;
	reiniciar.disabled = false;
	tablero(1);
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

function tablero(tipo){

	imagen.src = "img/derecha.png";

	switch(tipo){
		case 1:
			var x = 5;
			var y = 5;
			var ctx = canvas.getContext("2d");
			var bot = new Bot(tablero1);
			for(var i = 0; i < 3; i++){
				for(var j = 0; j<5; j++){
		        	ctx.fillStyle=tablero1[i][j];
					ctx.fillRect(x, y, 50, 40);
					x = x + 60;
	       	 	}
	       	 	y = y + 50;
	       	 	x = 5;
			}
			ctx.drawImage(imagen,5,10,50,20);
			ctx.globalCompositeOperation = "destination-top";	
	        break;
	    case 2:
	        var x = 5;
			var y = 5;
			var ctx = canvas.getContext("2d");
			var bot = new Bot(tablero1);
			for(var i = 0; i < 5; i++){
				for(var j = 0; j<7; j++){
		        	ctx.fillStyle="#FF0000";
					ctx.fillRect(x, y, 30, 20);
					x = x + 40;
	       	 	}
	       	 	y = y + 30;
	       	 	x = 5;
			}
			ctx.drawImage(imagen,5,7,30,15);
			ctx.globalCompositeOperation = "destination-top";
	        break;
	}
}

class Bot {
	constructor(tabl,posx=0,posy=0,dir="oriente"){
		this.posicionX = posx;
		this.posicionY = posy;
		this.direccion = dir;
		this.tabl = tabl;
	}

	GirarHorario(direccion){
		switch (direccion){
            case "norte":
                this.direccion = "oriente";
                break;
            case "oriente":
				this.direccion = "sur";
                break;
            case "sur":
				this.direccion = "occidente";
                break;
            case "occidente":
				this.direccion = "norte";
                break;
        }
	}

	GirarAntihorario(direccion){
		switch (direccion){
            case "norte":
				this.direccion = "occidente";
                break;
            case "occidente":
				this.direccion = "sur";
                break;
            case "sur":
				this.direccion = "oriente";
                break;
            case "oriente":
				this.direccion = "norte";
                break;
        }
	}

	Avanzar (){
        switch (direccion){
            case "norte":
                this.posisionY = (this.Mirar(this.posisionX, this.posisionY-1) ? this.posisionY - 1: this.posisionX);
                break;
            case "oriente":
				this.posisionX = (this.Mirar(this.posisionX+1, this.posisionY) ? this.posisionX + 1 : this.posisionY);
                break;
            case "sur":
				this.posisionY = (this.Mirar(this.posisionX, this.posisionY+1) ? this.posisionY + 1 : this.posisionY);
                break;
            case "occidente":
				this.posisionX = (this.Mirar(this.posisionX-1, this.posisionY) ? this.posisionX - 1 : this.posisionX);
                break;
        }
	}
	
	static Mirar(posisionX, posisionY){
        try{
            if(this.tablero[posisionY][posisionX] == bloqueada){
                return false;
            }
        }catch (err){
            return false;
        }
        return true;
    }

}
