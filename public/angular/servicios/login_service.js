var app = angular.module('loginApp.loginService',[]);


app.factory('LoginService', ['$http','$q', function( $http, $q ){

	var self = {

		// ================================================
		//   SERVICIO PARA VERIFICAR DATOS DE LOGEO
		// ================================================

		login: function( datos ){

			var d = $q.defer();

			console.log("usando login");
			console.log(datos);

			$http({ method:"POST", url: 'php/login/post.verificar.php' , data: datos })
				.then(function( respuesta ){

					console.log( respuesta );
					//self.cargarPagina( self.pag_actual  );
					d.resolve( respuesta.data );

				});

			/*$http.post('php/login/post.verificar.php', datos)
				 .success(function( data ){

				 	console.log( data );
				 	d.resolve( data );


				 });*/

			return d.promise;

		},

		// ================================================
		//   SERVICIO PARA REGISTRAR USUARIO
		// ================================================

		registro: function( datos ){

			var d = $q.defer();

			$http({ method:"POST", url: 'php/registro/post.registro.php' , data: datos })
				.then(function( respuesta ){

					console.log( respuesta );
					//self.cargarPagina( self.pag_actual  );
					d.resolve( respuesta.data );

				});

			/*$http.post('php/registro/post.registro.php', datos)
				 .success(function( data ){

				 	console.log( data );
				 	d.resolve( data );


				 });*/

			return d.promise;

		},
		// ================================================
		//   SERVICIO PARA ENVIAR CORREO A USUARIO
		// ================================================

		envioCorreo: function( token ){

			var d = $q.defer();

			$http({ method:"POST", url: 'php/registro/enviarCorreo.php' , data: token })
				.then(function( respuesta ){

					console.log( respuesta );
					//self.cargarPagina( self.pag_actual  );
					d.resolve( respuesta.data );

				});

			/*$http.post('php/registro/activarCuenta.php', token)
				.success(function( data ){

				 	console.log( data );
				 	d.resolve( data );

				})
			;*/

			return d.promise;

		},

		// ================================================
		//   SERVICIO PARA ACTIVAR A USUARIO
		// ================================================

		activar: function( datosActivar ){

			var d = $q.defer();

			$http({ method:"POST", url: 'php/registro/activarCuenta.php' , data: datosActivar })
				.then(function( respuesta ){

					console.log( respuesta );
					//self.cargarPagina( self.pag_actual  );
					d.resolve( respuesta.data );

				});

			/*$http.post('php/registro/activarCuenta.php', token)
				.success(function( data ){

				 	console.log( data );
				 	d.resolve( data );

				})
			;*/

			return d.promise;

		},

		// ================================================
		//   SERVICIO PARA GUARDAR CON IMAGEN
		// ================================================

		guardar: function( usuario ){

			var d = $q.defer();

			console.log("usando guardado de usuario en login");
			console.log(JSON.stringify(usuario));

			Upload.upload({ url: 'php/registro/post.registro.php',file: usuario })
			.progress(function(e) {
			})
			.then(function(data, status, headers, config) {
    			// si el archivo se subio satisfactoriamente
    			console.log(data);
    			//self.cargarPagina( self.pag_actual  );
    			d.resolve();
  			}); 

			return d.promise;

		},
		// ================================================

	};

	return self;

}])



