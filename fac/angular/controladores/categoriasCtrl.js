var app = angular.module('facturacionApp.categoriasCtrl', []);

// ================================================
//   Controlador de categorias
// ================================================

app.controller('categoriasCtrl', ['$scope','$routeParams','Categorias', 'Usuario', function($scope, $routeParams, Categorias, Usuario){

	// ================================================
	//   Variables
	// ================================================

	$scope.activar('mCategorias','','PRODUCTOS','Categorías');

	$scope.bandera 					= true;
	$scope.listaProductosCategoria 	= 'vistas/categorias/listaProductosCategoria.html';

	$scope.categorias   	= {};
	$scope.usuario 			= {};
	$scope.categoriaSel 	= {};
	$scope.listaProductos 	= {};

	$scope.permiso 			= true;

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
	//   Cargar pagina con Datos
	// ================================================

	$scope.cargar= function(){


		swal.showLoading()

		Categorias.cargarPagina().then( function(){

			swal.close();
			$scope.bandera = true;
			$scope.categorias = Categorias;
			console.log( JSON.stringify($scope.categorias) );

		});

	};

	$scope.cargar();

	// ================================================
	//   Cargar pagina con Datos
	// ================================================

	$scope.cargarProductos= function( categoria ){

		//console.log( categoria.nombre );

		swal.showLoading()

		Categorias.cargarProductos( categoria.nombre ).then( function(){

			swal.close();
			$scope.bandera = false;
			$scope.listaProductos = Categorias.productos;
			console.log( $scope.listaProductos );

		});

	};


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
