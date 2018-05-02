var pasos = [];

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
	switch(tipo){
		case 1:
			var x = 5;
			var y = 5;
			var ctx = canvas.getContext("2d");
			for(var i = 0; i < 3; i++){
				for(var j = 0; j<5; j++){
		        	ctx.fillStyle="#FF0000";
					ctx.fillRect(x, y, 50, 40);
					x = x + 60;
	       	 	}
	       	 	y = y + 50;
	       	 	x = 5;
			}	
	        break;
	    case 2:
	        var x = 5;
			var y = 5;
			var ctx = canvas.getContext("2d");
			for(var i = 0; i < 5; i++){
				for(var j = 0; j<7; j++){
		        	ctx.fillStyle="#FF0000";
					ctx.fillRect(x, y, 30, 20);
					x = x + 40;
	       	 	}
	       	 	y = y + 30;
	       	 	x = 5;
			}	
	        break;
	}
}
