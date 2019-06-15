var app = angular.module('facturacionApp.usuario',[]);

app.factory('Usuario', ['$http', '$q', 'Upload', function($http, $q, Upload){


	var self = {

		'cargando'			: false,
		'err'     			: false, 
		'conteo' 			: 0,
        'usuario' 		    : [],
        
        // ================================================
		//   SERVICIO PARA GUARDAR
		// ================================================

		guardar: function( usuario ){

			var d = $q.defer();

			console.log("usando guardado de usuario");
			console.log(JSON.stringify(usuario));

			Upload.upload({ url: 'php/usuario/post.usuario.php',file: usuario })
			.progress(function(e) {
			})
			.then(function(data, status, headers, config) {
    			// si el archivo se subio satisfactoriamente
                console.log(data);
                //self.cargarPagina();
    			d.resolve();
  			}); 

			return d.promise;

		},

		// ================================================
		//   SERVICIO PARA ELIMINAR
		// ================================================

		eliminar: function( usuario ){

			var d = $q.defer();

			console.log("usando eliminar usuario");
			console.log(usuario);

			$http({ method:"POST", url: 'php/usuario/delete.usuario.php' , data: usuario })
				.then(function( respuesta ){

					console.log( respuesta );
					//self.cargarPagina();
					d.resolve();

				});

			return d.promise;

		},

		// ========================================================
		//   SERVICIO PARA OBTENER DATOS DE USUARIO
		// ========================================================
		
		cargarUsuario: function(){

			

			var d = $q.defer();

			$http({ method:"GET", url:'php/usuario/get.usuario.php'})
				.then(function( data ){

					console.log(data);
					self.usuario  = data.data;
                    //self.cargarPagina();
					return d.resolve();
					
				});

			return d.promise;
		}

		// ================================================

	};

	return self;

}]);