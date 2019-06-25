var app = angular.module('facturacionApp.clientesCrtl', []);

// ================================================
//   Controlador de clientes
// ================================================

app.controller('clientesCtrl', ['$scope','$routeParams', 'Clientes', 'Usuario', function($scope, $routeParams, Clientes, Usuario){

	// ================================================
	//   Variables
	// ================================================

	var pag = $routeParams.pag;


	$scope.activar('mClientes','','Clientes','listado');
	$scope.clientes   	= {};
	$scope.usuario 		= {};
	$scope.clienteSel 	= {};

	$scope.permiso 		= true;

	// CARGA LA INFORMACION DEL USUARIO
	$scope.datosUsu = function(){
		Usuario.cargarUsuario().then( function(){
			$scope.usuario = Usuario.usuario;
			if( $scope.usuario.permiso != 1 ){
				$scope.permiso 	= false;
			}
			//console.log ("datos usuario JSON: "+JSON.stringify( $scope.usuario ) );
		});
	}

	$scope.datosUsu();

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
