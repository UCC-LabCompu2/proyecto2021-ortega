/**
 * Función Principal, recibe los datos ingresados para cada campo y activa la función
 * Dibuja().
 * @method myFunction
 */
function myFunction() {
    // Valores en defecto en pantalla
    document.getElementById('ang_inc').value;
    document.getElementById('n1').value;
    document.getElementById('n2').value;

    Dibuja();
}

/**
 * Realiza los cálculos con su correspondiente gráfico para cada ejercicio
 * @method Dibuja
 */
function Dibuja() {

    var EnError; // Bandera
    EnError = 0;

    var Angulo1 = parseFloat(document.getElementById('ang_inc').value) * 2 * Math.PI / 360;  //en radianes
    var n1 = parseFloat(document.getElementById('n1').value);
    var n2 = parseFloat(document.getElementById('n2').value);
    var Angulo2;


    if (n1 > n2 && n1 > 0 && n2 > 0) { // Cálculo del ángulo crítico.
        document.getElementById('ang_crit').value = ((Math.asin(n2 / n1) * 100 * 360 / 2 / Math.PI) / 100).toFixed(2);
    }


    if (parseFloat(document.getElementById('ang_inc').value) < 0 || parseFloat(document.getElementById('ang_inc').value) >= 90) {
        document.getElementById('ang_inc').value = "";
        document.getElementById('ang_ref').value = "";
        EnError = 1;
    }

    if (isNaN(parseFloat(document.getElementById('ang_inc').value))) { // Si el campo del ángulo incidente está vacío...
        document.getElementById('ang_inc').value = "";
        document.getElementById('ang_ref').value = "";
        alert2();
        EnError = 1;
    }


    if (Math.sin(Angulo1) * n1 / n2 > 1 & n1 > 0 && n2 > 0) {
        document.getElementById('ang_ref').value = "";
        EnError = 1;
    }

    if (n1 <= 0) { // Si el índice n1 ingresado es negativo.
        document.getElementById('n1').value = "";
        document.getElementById('ang_ref').value = "";
        alert1();
        EnError = 1;
    }

    if (n2 <= 0) { // Si el índice n2 ingresado es negativo.
        document.getElementById('n2').value = "";
        document.getElementById('ang_ref').value = "";
        alert1();
        EnError = 1;
    }

    if (n1 > 10) {
        document.getElementById('n1').value = "";
        document.getElementById('ang_ref').value = "";
        alert1();
        EnError = 1;
    }

    if (n2 > 10) {
        document.getElementById('n2').value = "";
        document.getElementById('ang_ref').value = "";
        alert1();
        EnError = 1;
    }

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById('ang_ref').value = "";
        alert1();
        EnError = 1;
    }


    Angulo2 = Math.asin(Math.sin(Angulo1) * n1 / n2); // Cálculo del ángulo refractado


    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 300, 200);
    ctx.beginPath();
    ctx.rect(0, 0, 300, 100);
    ctx.fillStyle = "#ADD8E6";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(0, 100, 300, 200);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();

    if (EnError == 0) {
        document.getElementById('ang_ref').value = ((Angulo2 * 360 / 2 / Math.PI * 100) / 100).toFixed(2);  //en grados

        //Haz en primer medio
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.lineWidth = "3";
        ctx.moveTo(150, 100);
        ctx.lineTo((150 - 90 * Math.sin(Angulo1)), (100 - 90 * Math.cos(Angulo1)));
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();

        //Flechita1
        ctx.beginPath();
        ctx.lineWidth = "1.5";
        ctx.moveTo(150, 100);
        ctx.lineTo((150 - 15 * Math.sin(Angulo1 - 0.3)), (100 - 15 * Math.cos(Angulo1 - 0.3)));
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = "1.5";
        ctx.moveTo(150, 100);
        ctx.lineTo((150 - 15 * Math.sin(Angulo1 + 0.3)), (100 - 15 * Math.cos(Angulo1 + 0.3)));
        ctx.strokeStyle = '#ff0000';
        ctx.stroke();


        //Haz en segundo medio
        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.moveTo(150, 100);
        ctx.lineTo((150 + 90 * Math.sin(Angulo2)), (100 + 90 * Math.cos(Angulo2)));
        ctx.strokeStyle = '#fc0000';
        ctx.stroke();


        //Eje vertical
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.setLineDash([5, 3]);
        ctx.moveTo(150, 0);
        ctx.lineTo(150, 200);
        ctx.strokeStyle = '#9ab4e3';
        ctx.stroke();


        //Ángulo1
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.lineWidth = "1";
        ctx.arc(150, 100, 50, -0.5 * Math.PI, -0.5 * Math.PI - Angulo1, true);
        ctx.strokeStyle = '#9ab4e3';
        ctx.stroke();

        //Ángulo2
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.lineWidth = "1";
        ctx.arc(150, 100, 50, 0.5 * Math.PI, 0.5 * Math.PI - Angulo2, true);
        ctx.strokeStyle = '#9ab4e3';
        ctx.stroke();

        //Letras Theta y n1  n2
        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("θ1", 135, 45);
        if (Angulo2 > 0) {
            ctx.fillText("θ2", 140, 164);
        }
        ctx.font = "18px Arial";
        ctx.fillText("n1", 10, 25);
        ctx.fillText("n2", 10, 125);


    } else {
        ctx.font = " bold 12px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("El Ángulo 1 supera el ángulo crítico", 150, 100);
        ctx.fillText("para esos índices de refracción", 150, 115);
        canvas.width = canvas.width;
    }

}

/**
 * Borra todos los campos cuando el usuario aprieta el botón 'Limpiar' para realizar un nuevo cálculo
 * @method borrarCampos
 */
function borrarCampos() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    document.getElementById("ang_inc").value = "";
    document.getElementById("n1").value = "";
    document.getElementById("n2").value = "";
    document.getElementById("ang_ref").value = "";
    document.getElementById("ang_crit").value = "";
    canvas.width = canvas.width;
}

/**
 * Muestra una alerta cuando el usuario no cumple con que el índice de refracción sea positivo o muestra
 * si el campo se encuentra vacío.
 * @method alert1
 */
function alert1() {
    alert("Ingrese un número de índice de refracción positivo. (Recomendación: entre 1 y 10) ");
}

/**
 * Muestra una alerta cuando el usuario no carga un valor positivo para el ángulo incidente,
 * o simplemente el campo está vacío.
 * @method alert2
 */
function alert2() {
    alert("Ingrese un valor para el ángulo de incidencia.");
}

