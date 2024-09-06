// Función para procesar 1000 ciclos y calcular los errores
function procesar() {
    const ciclos = 1000;
    let erroresArcoseno = 0;
    let erroresArcocoseno = 0;
    let erroresRaizCuadrada = 0;
    let erroresDivision = 0;
    let erroresLogaritmo = 0;

    for (let i = 0; i < ciclos; i++) {
        // Generar valores aleatorios entre -1 y 1
        let a = Math.random() * 2 - 1;
        let b = Math.random() * 2 - 1;
        let c = Math.random() * 2 - 1;
        let d = Math.random() * 2 - 1;
        let e = Math.random() * 2 - 1;
        let f = Math.random() * 2 - 1;
        let g = Math.random() * 2 - 1;
        let h = Math.random() * 2 - 1;
        let iVar = Math.random() * 2 - 1;
        let k = Math.random() * 2 - 1;
        let p = Math.random() * 2 - 1;

        // Variables para guardar las partes de la ecuación
        let numerador, denominador;

        // Comprobar cada operación individualmente y contar los errores
        // Para acos(), asin(), se deben asegurar de estar dentro de su dominio (-1 <= x <= 1)

        // Comprobación de acos()
        try {
            if (a - b >= -1 && a - b <= 1) {
                numerador = Math.acos(a - b);
            } else {
                throw new Error("Fuera de dominio de acos");
            }
        } catch (error) {
            erroresArcoseno++;
        }

        // Comprobación de asin() y sqrt()
        try {
            if (c - d > 0 && b / Math.sqrt(c - d) >= -1 && b / Math.sqrt(c - d) <= 1) {
                numerador += Math.asin(b / Math.sqrt(c - d));
            } else {
                throw new Error("Fuera de dominio de asin o sqrt");
            }
        } catch (error) {
            erroresArcocoseno++;
            if (error.message.includes("sqrt")) {
                erroresRaizCuadrada++;
            }
        }

        // Comprobación de log() - debe ser un valor positivo
        try {
            if (p > 0) {
                numerador += Math.log(p);
            } else {
                throw new Error("Logaritmo de valor no positivo");
            }
        } catch (error) {
            erroresLogaritmo++;
        }

        // Comprobación de asin() y sqrt() en el denominador
        try {
            if (f - g > 0 && e / Math.sqrt(f - g) >= -1 && e / Math.sqrt(f - g) <= 1) {
                denominador = Math.asin(e / Math.sqrt(f - g));
            } else {
                throw new Error("Fuera de dominio de asin o sqrt");
            }
        } catch (error) {
            erroresArcocoseno++;
            if (error.message.includes("sqrt")) {
                erroresRaizCuadrada++;
            }
        }

        // Comprobación de log() en el denominador
        try {
            if (h > 0) {
                denominador += Math.log(h);
            } else {
                throw new Error("Logaritmo de valor no positivo");
            }
        } catch (error) {
            erroresLogaritmo++;
        }

        // Comprobación de acos() en el denominador
        try {
            if (iVar / k >= -1 && iVar / k <= 1) {
                denominador += Math.acos(iVar / k);
            } else {
                throw new Error("Fuera de dominio de acos");
            }
        } catch (error) {
            erroresArcoseno++;
        }

        // Validar la división por cero
        if (denominador === 0 || !isFinite(denominador) || !isFinite(numerador)) {
            erroresDivision++;
        }
    }

    // Actualizar la tabla con los errores
    document.getElementById("totalArcoseno").textContent = erroresArcoseno;
    document.getElementById("totalArcocos").textContent = erroresArcocoseno;
    document.getElementById("totalRaizCuadrada").textContent = erroresRaizCuadrada;
    document.getElementById("totalDivision").textContent = erroresDivision;
    document.getElementById("totalLogaritmo").textContent = erroresLogaritmo;

    // Calcular porcentajes
    document.getElementById("porcentajeArcoseno").textContent = ((erroresArcoseno / ciclos) * 100).toFixed(2) + "%";
    document.getElementById("porcentajeArcocos").textContent = ((erroresArcocoseno / ciclos) * 100).toFixed(2) + "%";
    document.getElementById("porcentajeRaizCuadrada").textContent = ((erroresRaizCuadrada / ciclos) * 100).toFixed(2) + "%";
    document.getElementById("porcentajeDivision").textContent = ((erroresDivision / ciclos) * 100).toFixed(2) + "%";
    document.getElementById("porcentajeLogaritmo").textContent = ((erroresLogaritmo / ciclos) * 100).toFixed(2) + "%";

    // Mostrar gráfico de pastel con los errores
    cargarGrafico(erroresArcoseno, erroresArcocoseno, erroresRaizCuadrada, erroresDivision, erroresLogaritmo);
}

// Función para mostrar el gráfico de pastel
function cargarGrafico(erroresArcoseno, erroresArcocoseno, erroresRaizCuadrada, erroresDivision, erroresLogaritmo) {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Tipo de Error', 'Cantidad'],
            ['Arcoseno', erroresArcoseno],
            ['Arcocoseno', erroresArcocoseno],
            ['Raíz Cuadrada', erroresRaizCuadrada],
            ['División', erroresDivision],
            ['Logaritmo', erroresLogaritmo]
        ]);

        var options = {
            title: 'Distribución de Errores'
        };

        var chart = new google.visualization.PieChart(document.getElementById('graficoErrores'));
        chart.draw(data, options);
    }
}
