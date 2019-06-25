var app = angular.module('facturacionApp.automoviles',[]);

app.factory('Automoviles', ['$http', '$q', 'Upload', function($http, $q, Upload){


	var self = {

		'cargando'		: false,
		'err'     		: false, 
		'conteo' 		: 0,
		'automoviles' 	: [],
		'comprados'		: [],
		'colores' 		: [],
		'categorias' 	: [],
		'pag_actual'    : 1,
		'pag_siguiente' : 1,
		'pag_anterior'  : 1,
		'total_paginas' : 1,
		'paginas'	    : [],

		// ================================================
		//   SERVICIO PARA GUARDAR
		// ================================================

		guardar: function( automovil ){

			var d = $q.defer();

			console.log("usando guardado de automovil");
			console.log(JSON.stringify(automovil));

			Upload.upload({ url: 'php/automoviles/post.automovil.php',file: automovil })
			.progress(function(e) {
			})
			.then(function(data, status, headers, config) {
    			// si el archivo se subio satisfactoriamente
    			console.log(data);
    			self.cargarPagina( self.pag_actual  );
    			d.resolve();
  			}); 

			return d.promise;

		},

		// ================================================
		//   SERVICIO PARA GUARDAR
		// ================================================

		comprar: function( automovil ){

			var d = $q.defer();
			self.comprados = automovil;
			//console.log( JSON.stringify( self.comprados ) );
			d.resolve();
			return d.promise;

		},

		// ================================================
		//   SERVICIO PARA ELIMINAR
		// ================================================

		eliminar: function( automovil ){

			var d = $q.defer();

			console.log("usando eliminar de automovil");
			console.log(automovil);

			$http({ method:"POST", url: 'php/automoviles/delete.automovil.php' , data: automovil })
				.then(function( respuesta ){

					console.log( respuesta );
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

			$http({ method:"GET", url:'php/automoviles/get.listaAutomoviles.php?pag=' + pag })
				.then(function( data ){

					//console.log(data);

					self.err           = data.data.err;
					self.conteo        = data.data.conteo;
					self.automoviles   = data.data.automoviles;
					self.pag_actual    = data.data.pag_actual;
					self.pag_siguiente = data.data.pag_siguiente;
					self.pag_anterior  = data.data.pag_anterior;
					self.total_paginas = data.data.total_paginas;
					self.paginas       = data.data.paginas;

					return d.resolve();
					
				});

			return d.promise;
		},

		// ================================================
		//   SERVICIO PARA CARGAR COLORES
		// ================================================
		
		cargarColores: function(){

			var d = $q.defer();

			$http({ method: "GET", url: 'json/colores.json'})
	            .then(function (datos) {
	            	//console.log("colores servicio autos: "+JSON.stringify(datos));
	            	self.colores = datos.data.colores;
	                return d.resolve();

	            })
	            .catch(function (err) {
	                console.log("error al traer datos de colores: "+err);
	                return d.reject();

	            })	
            ;

			return d.promise;
		},

		// ================================================
		//   SERVICIO PARA CARGAR CATEGORIAS
		// ================================================
		
		cargarCategorias: function(){

			var d = $q.defer();

			$http({ method: "GET", url: 'php/categorias/get.listaCategorias.php'})
	            .then(function (datos) {
	            	//console.log("categorias servicio autos: "+JSON.stringify(datos));
	            	self.categorias = datos.data;
	                return d.resolve();

	            })
	            .catch(function (err) {
	                console.log("error al traer datos de categorias: "+err);
	                return d.reject();

	            })	
            ;

			return d.promise;
		}

		// -------------------------------------------- //
	};

	return self;

}]);