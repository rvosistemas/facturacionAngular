var app = angular.module('loginApp.productosCtrl', []);

// ================================================
//   Controlador de Dashboard
// ================================================
app.controller('productosCtrl', ['$scope', 'LoginService', '$timeout', function($scope, LoginService, $timeout){
	
	// ================================================
	//   Variables
	// ================================================
	$scope.activar('mRegistro','','Registro','Registro');

	$scope.datosRegistro 		= {};
	$scope.mensajeActivacion 	= false;
	$scope.mensajeCorreo 		= false;
	$scope.token 				= '';
	$scope.mensajeGlobal 		= '';
	$scope.verMensajeGlobal 	= false;
    
	/*=============================================
	=            FUNCION DE REGISTRO           	 =
	=============================================*/


	$scope.registrar = function( usuario, frmRegistro ){

		console.log("REGISTRANDO NUEVO USUARIO");
		//frmRegistro.autoValidateFormOptions.resetForm();

		if ( usuario.contrasena == usuario.contrasena2 ) {

			$scope.verPass	= false;

			LoginService.registro( usuario ).then( function( data ){

				console.log( "respuesta de  registro: "+JSON.stringify(data) );

				if( data.err ){

					console.log("ERROR al registrar");
					$scope.mensajeGlobal  	= data.mensaje;
					$scope.verMensajeGlobal = true;
					$scope.mensajeCorreo 	= false;

				}else{

					$scope.token = data.token;
					console.log("token de activacion: "+$scope.token);
					console.log("EXITO al registrar");
					$scope.mensajeGlobal  	= data.mensaje;
					$scope.verMensajeGlobal = true;
					$timeout(function() {
						$scope.envioCorreo( $scope.token, usuario.email, usuario.nombre );
  					},1000);

				}

			});

		}else{

			$scope.verPass	= true;

		}
	}

	/*=============================================
	=              ENVIO CORREO		          	 =
	=============================================*/
	$scope.envioCorreo = function( token, email, nombre ){

		console.log("ENVIANDO CORREO CON TOKEN A USUARIO");

		$scope.verPass	= false;

		$scope.datosRegistro = {
			token: token,
			email: email,
			nombre: nombre
		}

		LoginService.envioCorreo( $scope.datosRegistro ).then( function( data ){

			// TODO... continuar
			if( data.err ){

				console.log("ERROR al enviar token al correo");
				$scope.mensajeGlobal  = data.mensaje;
				$scope.verMensajeGlobal = true;
				$scope.mensajeCorreo 	= false;

			}else{

				console.log( data.mensaje );
				console.log("EXITO al enviar token al correo");
				$timeout(function() {
					$scope.mensajeCorreo = true;
				},1000);

			}

		});

	}

	/*=============================================
	=              ACTIVAR CUENTA           	 =
	=============================================*/
	$scope.activarCuenta = function( datosActivar , frmActivar ){

		console.log("ACTIVANDO NUEVO USUARIO");

		//frmActivar.autoValidateFormOptions.resetForm();

		$scope.verPass	= false;

		LoginService.activar( datosActivar ).then( function( data ){

			if( data.err ){

				console.log("ERROR al activar");
				$scope.mensajeGlobal  		= data.mensaje;
				$scope.verMensajeGlobal 	= true;
				$scope.mensajeActivacion 	= false;

			}else{

				$scope.mensajeGlobal  		= data.mensaje;
				$scope.verMensajeGlobal 	= true;
				$scope.mensajeActivacion 	= true;
				console.log("EXITO al activar");
				$timeout(function() {
					window.location = 'http://localhost/udemy/ANGULAR%20JS/facturacion%20login/public/#!/login';
				},4000);

			}

		});

	}
    
}]);