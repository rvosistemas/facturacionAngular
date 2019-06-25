var app = angular.module('loginApp.productosService',[]);


app.factory('productosService', ['$http','$q', function( $http, $q ){

	var self = {

        automoviles:{},

		// ================================================
		//   SERVICIO PARA CARGAR DATOS DE AUTOMOVILES
		// ================================================

		cargarAutos: function( datos ){

			var d = $q.defer();

			//console.log("usando carga de categorias");
			//console.log(datos);

			$http({ method:"GET", url: '../fac/php/automoviles/get.automoviles.php' })
				.then(function( respuesta ){

					//console.log( respuesta );
                    //self.cargarPagina( self.pag_actual  );
                    self.automoviles = respuesta.data;
					d.resolve( respuesta.data );

				});

			return d.promise;

		},

		// ================================================

	};

	return self;

}])



