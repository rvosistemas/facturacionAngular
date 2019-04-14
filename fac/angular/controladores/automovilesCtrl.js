var app = angular.module('facturacionApp.automovilesCrtl', []);

// ================================================
//   Controlador de automoviles
// ================================================
app.controller('automovilesCtrl', ['$scope','$routeParams','Automoviles', function($scope, $routeParams, Automoviles){

	var pag = $routeParams.pag;


	$scope.activar('mAutomoviles','','Automoviles','listado');
	$scope.automoviles   		= {};
	$scope.automovilSel 		= {};
	$scope.automovil 			= {};


	$scope.moverA = function( pag ){

		Automoviles.cargarPagina( pag ).then( function(){
			$scope.clientes = Automoviles;
			//console.log($scope.clientes);
		});

	};


	$scope.moverA(pag);


	// ================================================
	//   Mostrar modal de edicion
	// ================================================
	$scope.mostrarModal = function( automovil ){

		//console.log( automovil ); muestra todo al editar
		angular.copy( automovil, $scope.automovilSel );
		$("#modal_automovil").modal();

	}
	
	// ================================================
	//   Funcion para guardar
	// ================================================

	$scope.guardarAuto = function( automovil, frmAutomovil ){

		Automoviles.guardar( automovil ).then(function(){

			// codigo cuando se actualizo
			$("#modal_automovil").modal('hide');
			$scope.clienteSel = {};

			frmAutomovil.autoValidateFormOptions.resetForm();

		});
	
	}



}]);
