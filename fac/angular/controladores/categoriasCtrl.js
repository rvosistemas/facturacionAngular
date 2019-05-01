var app = angular.module('facturacionApp.categoriasCtrl', []);

// ================================================
//   Controlador de categorias
// ================================================

app.controller('categoriasCtrl', ['$scope','$routeParams','Categorias', function($scope, $routeParams, Categorias){

	// ================================================
	//   Variables
	// ================================================

	$scope.activar('mCategorias','','Categorías','listado');

	$scope.categorias   	= {};
	$scope.categoriaSel 	= {};

	// ================================================
	//   Mostrar modal de edicion y guardado
	// ================================================

	$scope.mostrarModal = function( categoria ){

		//console.log( categoria ); muestra todo al editar
		angular.copy( categoria, $scope.categoriaSel );
		$("#modal_categoria").modal();

	}

	// ================================================
	//   Funcion para guardar y editar
	// ================================================

	$scope.guardarCategoria = function( categoria, frmCategoria ){

		Swal.fire({

            title: 'Esta seguro de guardar los datos de la categoría!',
            text: "Igualmente puede editar los datos en el futuro",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'SI, Guardar!'

        }).then((result) => {
        	
            if (result.value) {

        		Categorias.guardar( categoria )
	        		.then(function(){

						$("#modal_categoria").modal('hide');
						$scope.categoriaSel = {};
						frmCategoria.autoValidateFormOptions.resetForm();

						Swal.fire({

			  				position: 'top-end',
			  				type: 'success',
			  				title: 'Datos guardados correctamente',
			  				showConfirmButton: false,
			  				timer: 1500

						})

					})
					.catch(function(err){

						console.log("error al guardar datos de la categoría: "+err);

					})
				;

            }
        })
	
	}

	// ================================================
	//   Funcion para eliminar
	// ================================================

	$scope.eliminar = function( categoria ){

		Swal.fire({

            title: 'Esta seguro de eliminar los datos de la Categoría!',
            text: "Se eliminaran todos los datos de la categoría",
            type: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'SI, Eliminar!'

        }).then((result) => {

            if (result.value) {

				Categoria.eliminar( categoria )
					.then(function(){

						$scope.categoriaSel = {};

						Swal.fire({

						  	position: 'top-end',
						  	type: 'success',
						  	title: 'Datos eliminados correctamente',
						  	showConfirmButton: false,
						  	timer: 1500

						})

					})
					.catch(function(err){

						console.log("error al eliminar datos dela categoría: "+err);

					})
				;

            }

        })

	}

}]);
