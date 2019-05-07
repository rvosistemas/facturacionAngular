var app = angular.module('facturacionApp.dashboardCrtl', []);

// ================================================
//   Controlador de Dashboard
// ================================================
app.controller('dashboardCtrl', ['$scope','Dashboard', function($scope, Dashboard){
	
// ================================================
//   Variables
// ================================================
	$scope.activar('mDashboard','','Dashboard','información');

	$scope.datosAuto = {};

	var cont = [0,0,0,0,0,0,0,0,0,0,0]; // arreglo para contar los colores

	$scope.colors; // el nombre del grafico de colores
	

	// ================================================
	//   Cargar pagina con Datos
	// ================================================

	$scope.cargar= function(){


		swal.showLoading()

		Dashboard.cargarDatosAutos().then( function(){

			swal.close();
			$scope.datosAuto = Dashboard.autos;
			$scope.calcularColores($scope.datosAuto);
			console.log( $scope.datosAuto );
		});

	};

	$scope.cargar();

	/* ----------------------------------------------
            CALCULO COLORES AUTOS
    ---------------------------------------------- */
    $scope.calcularColores= function(autos){
    	
    	for (var i = 0; i < autos.length; i++) {
    		
    		switch(autos[i].color){
    			case "rojo":
    				cont[0]=cont[0]+1;
    			break;
    			case "azul":
    				cont[1]=cont[1]+1;
    			break;
    			case "amarillo":
    				cont[2]=cont[2]+1;
    			break;
    			case "verde":
    				cont[3]=cont[3]+1;
    			break;
    			case "morado":
    				cont[4]=cont[4]+1;
    			break;
    			case "naranja":
    				cont[5]=cont[5]+1;
    			break;
    			case "blanco":
    				cont[6]=cont[6]+1;
    			break;
    			case "negro":
    				cont[7]=cont[7]+1;
    			break;
    			case "gris":
    				cont[8]=cont[8]+1;
    			break;
    			case "cafe":
    				cont[9]=cont[9]+1;
    			break;
    			case "rosado":
    				cont[10]=cont[10]+1;
    			break;
    		}
    	}
		console.log(JSON.stringify("arreglo colores: "+cont));
	};
	/* ----------------------------------------------
            GRAFICA DE COLORES AUTOS
    ---------------------------------------------- */

    var ctx = document.getElementById('colores').getContext('2d');

    $scope.colors = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ['Rojo', 'Azul', 'Amarillo', 'Verde', 'Morado', 'Naranja','Blanco', 'Negro', 'Gris', 'Cafe', 'Rosado'],
	        datasets: [{
	            label: '# de Colores',
	            data: cont,
	            backgroundColor: [
	                'rgba(255, 0, 0, 0.2)', 	// rojo
	                'rgba(0, 0, 255, 0.2)', 	// azul
	                'rgba(255, 255, 0, 0.2)',	// amarillo
	                'rgba(0, 128, 0, 0.2)', 	// verde
	                'rgba(128, 0, 128, 0.2)', 	// morado
	                'rgba(255, 175, 50, 0.2)', 	// naranja
	                'rgba(255, 255, 255, 0.2)', // blanco
	                'rgba(0, 0, 0, 0.2)', 		// negro
	                'rgba(128, 128, 128, 0.2)', // gris
	                'rgba(128, 0, 0, 0.2)', 	// cafe
	                'rgba(240, 128, 128, 0.2)' // rosado
	            ],
	            borderColor: [
	                'rgba(255, 0, 0, 1)', 		// rojo
	                'rgba(0, 0, 255, 1)', 		// azul
	                'rgba(255, 255, 0, 1)',		// amarillo
	                'rgba(0, 128, 0, 1)', 		// verde
	                'rgba(128, 0, 128, 1)', 	// morado
	                'rgba(255, 175, 50, 1)', 	// naranja
	                'rgba(0, 0, 0, 1)', 		// blanco (aunque se pone el borde en negro para que se vea)
	                'rgba(0, 0, 0, 1)', 		// negro
	                'rgba(128, 128, 128, 1)', 	// gris
	                'rgba(128, 0, 0, 1)', 		// cafe
	                'rgba(240, 128, 128, 1)' 	// rosado
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
    
}]);
