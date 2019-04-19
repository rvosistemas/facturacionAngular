var app = angular.module('facturacionApp.automovilesCrtl', []);

// ================================================
//   Controlador de automoviles
// ================================================

app.controller('automovilesCtrl', ['$scope','$routeParams','Automoviles', function($scope, $routeParams, Automoviles){

	// ================================================
	//   Varibles
	// ================================================

	var pag = $routeParams.pag;

	$scope.activar('mAutomoviles','','Automoviles','listado');

	$scope.automoviles   		= {};
	$scope.automovilSel 		= {};

	// ================================================
	//   Moverse entre el paginado
	// ================================================

	$scope.moverA = function( pag ){

		Automoviles.cargarPagina( pag ).then( function(){
			$scope.automoviles = Automoviles;
			console.log($scope.automoviles);
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

			$("#modal_automovil").modal('hide');
			$scope.automovilSel = {};

			frmAutomovil.autoValidateFormOptions.resetForm();

		});
	
	}

	// ================================================
	//   Funcion para eliminar
	// ================================================

	$scope.eliminar = function( automovil ){
		//console.log("id del auto seleccionado: "+automovil.id);
		Automoviles.eliminar( automovil ).then(function(){

			$scope.automovilSel = {};

			//frmAutomovil.autoValidateFormOptions.resetForm();

		});
	}

}]);
