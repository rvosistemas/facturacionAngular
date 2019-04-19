var app = angular.module('facturacionApp.clientesCrtl', []);

// ================================================
//   Controlador de clientes
// ================================================

app.controller('clientesCtrl', ['$scope','$routeParams', 'Clientes', function($scope, $routeParams, Clientes){

	// ================================================
	//   Variables
	// ================================================

	var pag = $routeParams.pag;


	$scope.activar('mClientes','','Clientes','listado');
	$scope.clientes   = {};
	$scope.clienteSel = {};

	// ================================================
	//   Moverse entre el paginado
	// ================================================

	$scope.moverA = function( pag ){

		swal.showLoading()

		Clientes.cargarPagina( pag ).then( function(){

			swal.close();
			$scope.clientes = Clientes;
			//console.log($scope.clientes);
		});

	};

	$scope.moverA(pag);

	// ================================================
	//   Mostrar modal de edicion
	// ================================================

	$scope.mostrarModal = function( cliente ){

		// console.log( cliente );
		angular.copy( cliente, $scope.clienteSel );
		$("#modal_cliente").modal();

	}

	// ================================================
	//   Funcion para guardar
	// ================================================

	$scope.guardar = function( cliente, frmCliente){

		Clientes.guardar( cliente ).then(function(){

			$("#modal_cliente").modal('hide');
			$scope.clienteSel = {};

			frmCliente.autoValidateFormOptions.resetForm();

		});

	}

}]);
