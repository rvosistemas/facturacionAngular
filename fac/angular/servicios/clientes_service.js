var app = angular.module('facturacionApp.clientes',[]);


app.factory('Clientes', ['$http', '$q', function($http, $q){

	var self = {

		'cargando'		: false,
		'err'     		: false, 
		'conteo' 		: 0,
		'clientes' 		: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		// ================================================
		//   SERVICIO PARA GUARDAR
		// ================================================

		guardar: function( cliente ){

			var d = $q.defer();

			console.log("usando guardado de cliente");

			$http({ method:"POST", url: 'php/clientes/post.clienteguardar.php' , data: cliente })
				.then(function( respuesta ){

					// console.log( respuesta );
					self.cargarPagina( self.pag_actual  );
					d.resolve();

				});

			return d.promise;

		},


		// ================================================
		//   SERVICIO PARA CARGAR PAGINA CON DATOS BD
		// ================================================

		cargarPagina: function( pag ){

			var d = $q.defer();

			$http({ method: "GET", url:'php/clientes/get.clientes.php?pag='+ pag })
				.then(function( data ){

					//console.log(data);

					self.err           = data.data.err;
					self.conteo        = data.data.conteo;
					self.clientes      = data.data.clientes;
					self.pag_actual    = data.data.pag_actual;
					self.pag_siguiente = data.data.pag_siguiente;
					self.pag_anterior  = data.data.pag_anterior;
					self.total_paginas = data.data.total_paginas;
					self.paginas       = data.data.paginas;

					return d.resolve();
				});

			return d.promise;
		}


	};


	return self;


}]);