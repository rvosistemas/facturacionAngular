var app = angular.module('loginApp.categoriasService',[]);


app.factory('categoriasService', ['$http','$q', function( $http, $q ){

	var self = {

        categorias:{},

		// ================================================
		//   SERVICIO PARA CARGAR DATOS DE CATEGORIA
		// ================================================

		cargar: function( datos ){

			var d = $q.defer();

			//console.log("usando carga de categorias");
			//console.log(datos);

			$http({ method:"GET", url: '../fac/php/categorias/get.listaCategorias.php' })
				.then(function( respuesta ){

					//console.log( respuesta );
                    //self.cargarPagina( self.pag_actual  );
                    self.categorias = respuesta.data;
					d.resolve( respuesta.data );

				});

			return d.promise;

		},

		// ================================================

	};

	return self;

}])



