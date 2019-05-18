var app = angular.module('facturacionApp.automovilesCrtl', []);

// ================================================
//   Controlador de automoviles
// ================================================

app.controller('automovilesCtrl', ['$scope','$routeParams','Automoviles', function($scope, $routeParams, Automoviles){

	// ================================================
	//   Variables
	// ================================================

	var pag = $routeParams.pag;

	$scope.activar('mAutomoviles','','Automoviles','listado');

	$scope.automoviles   	= {};
	$scope.automovilSel 	= {};
	$scope.categorias 		= {};
	$scope.colores 			= {};


	// ================================================
	//   Moverse entre el paginado
	// ================================================

	$scope.moverA = function( pag ){

		swal.showLoading()

		Automoviles.cargarPagina( pag ).then( function(){

			swal.close();
			$scope.automoviles = Automoviles;
			//console.log($scope.automoviles);

		});

	};

	$scope.moverA(pag);

	// ================================================
	//   Mostrar modal de edicion y guardado
	// ================================================

	$scope.mostrarModal = function( automovil ){

		//muestra todo al editar
		//console.log( "editar o guardar: " ); 
		//console.log( automovil ); 
		angular.copy( automovil, $scope.automovilSel );
		//console.log( "editar o guardar lo que hay en automovilSel: " ); 
		//console.log( $scope.automovilSel ); 
		$("#modal_automovil").modal();

	}

	// ================================================
	//   CARGAR DATOS DE LOS COLORES
	// ================================================

	Automoviles.cargarColores().then( function(){

		$scope.colores = Automoviles.colores;
		//console.log("colores en controlador: "+JSON.stringify(Automoviles.colores));

	});
	
	// ================================================
	//   CARGAR DATOS DE LAS CATEGORIAS
	// ================================================

	Automoviles.cargarCategorias().then( function(){

		$scope.categorias = Automoviles.categorias;

		//console.log("categorias en controlador: "+JSON.stringify($scope.categorias));

	});

	// ================================================
	//   Funcion para guardar y editar
	// ================================================

	$scope.guardarAuto = function( automovil, frmAutomovil ){

		Swal.fire({

            title: 'Esta seguro de guardar los datos del Automovil!',
            text: "Igualmente puede editar los datos en el futuro",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'SI, Guardar!'

        }).then((result) => {
        	
            if (result.value) {

        		Automoviles.guardar( automovil )
	        		.then(function(){

						$("#modal_automovil").modal('hide');
						$scope.automovilSel = {};
						frmAutomovil.autoValidateFormOptions.resetForm();

						Swal.fire({

			  				position: 'top-end',
			  				type: 'success',
			  				title: 'Datos guardados correctamente',
			  				showConfirmButton: false,
			  				timer: 1500

						})

					})
					.catch(function(err){

						console.log("error al guardar datos del automovil: "+err);

					})
				;

            }
        })
	
	}

	// ================================================
	//   Funcion para eliminar
	// ================================================

	$scope.eliminar = function( automovil ){

		Swal.fire({

            title: 'Esta seguro de eliminar los datos del Automovil!',
            text: "Se eliminaran todos los datos del automovil",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'SI, Eliminar!'

        }).then((result) => {

            if (result.value) {

				Automoviles.eliminar( automovil )
					.then(function(){

						$scope.automovilSel = {};

						Swal.fire({

						  	position: 'top-end',
						  	type: 'success',
						  	title: 'Datos eliminados correctamente',
						  	showConfirmButton: false,
						  	timer: 1500

						})

					})
					.catch(function(err){

						console.log("error al eliminar datos del automovil: "+err);

					})
				;

            }

        })

	}

}]);
