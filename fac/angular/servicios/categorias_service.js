var app = angular.module('facturacionApp.categorias',[]);

app.factory('Categorias', ['$http', '$q','Upload', function($http, $q, Upload){


	var self = {

		'cargando'			: false,
		'err'     			: false, 
		'conteo' 			: 0,
		'categorias' 		: [],
		'productos' 		: [],

		// ================================================
		//   SERVICIO PARA GUARDAR
		// ================================================

		guardar: function( categoria ){

			var d = $q.defer();

			console.log("usando guardado de categorias");
			console.log(JSON.stringify(categoria));

			Upload.upload({ url: 'php/categorias/post.categoria.php',file: categoria })
			.progress(function(e) {
			})
			.then(function(data, status, headers, config) {
    			// si el archivo se subio satisfactoriamente
    			console.log(data);
    			self.cargarPagina();
    			d.resolve();
  			}); 

			return d.promise;

		},

		// ================================================
		//   SERVICIO PARA ELIMINAR
		// ================================================

		eliminar: function( categoria ){

			var d = $q.defer();

			console.log("usando eliminar de categoria");
			console.log(categoria);

			$http({ method:"POST", url: 'php/categorias/delete.categoria.php' , data: categoria })
				.then(function( respuesta ){

					console.log( respuesta );
					self.cargarPagina();
					d.resolve();

				});

			return d.promise;

		},

		// ================================================
		//   SERVICIO PARA CARGAR PAGINA CON DATOS BD
		// ================================================
		
		cargarPagina: function(){

			var d = $q.defer();

			$http({ method:"GET", url:'php/categorias/get.categorias.php'})
				.then(function( data ){

					//console.log(data);

					self.err           = data.data.err;
					self.conteo        = data.data.conteo;
					self.categorias   = data.data.categorias;

					return d.resolve();
					
				});

			return d.promise;
		},

		// ========================================================
		//   SERVICIO PARA CARGAR LISTA DE PRODUCTOS POR CATEGORIA
		// ========================================================
		
		cargarProductos: function( nombreCategoria ){

			console.log(nombreCategoria);

			var d = $q.defer();

			$http({ method:"GET", url:'php/categorias/get.listaProductos.php?var=' + nombreCategoria})
				.then(function( data ){

					console.log(data);
					self.productos   = data.data;

					return d.resolve();
					
				});

			return d.promise;
		}

		// ================================================

	};

	return self;

}]);