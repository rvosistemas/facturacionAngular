var app = angular.module( 'loginApp',['login.loginService']);


app.controller('mainCtrl', ['$scope', 'LoginService', '$timeout', function( $scope, LoginService, $timeout ){
	

	$scope.invalido 	= false;
	$scope.cargando 	= false;
	$scope.verPass	 	= false;
	$scope.pagLog	 	= true;
	$scope.pagReg	 	= false;
	$scope.mensaje  	= "";

	$scope.datos 	= {};
	$scope.usuario 	= {};

	/*=============================================
	=            FUNCION DE LOGEO           	 =
	=============================================*/
	
	$scope.ingresar = function( datos ){

		if( datos.usuario.length < 3 ){
			$scope.invalido = true;
			$scope.mensaje  = 'Ingrese su usuario';
			return;

		}else if( datos.contrasena.length < 3 ) {
			$scope.invalido = true;
			$scope.mensaje  = 'Ingrese su contraseña';
			return;
		}

		$scope.invalido = false;
		$scope.cargando = true;

		LoginService.login( datos ).then( function( data ){

			// TODO... continuar
			if( data.err ){

				$scope.invalido = true;
				$scope.cargando = false;
				$scope.mensaje  = data.mensaje;

			}else{

				console.log( data.mensaje );
				window.location = data.url;

			}

		});


	}
	
	/*=============================================
	=            FUNCION DE REGISTRO           	 =
	=============================================*/


	$scope.registrar = function( usuario ){

		console.log("REGISTRANDO NUEVO USUARIO");

		if ( usuario.contrasena == usuario.contrasena2 ) {

			$scope.verPass	= false;

			LoginService.registro( usuario ).then( function( data ){

				// TODO... continuar
				if( data.err ){

					console.log("ERROR al registrar");
					$scope.mensaje  = data.mensaje;

				}else{

					console.log( data.mensaje );

					console.log("EXITO al registrar");
					$timeout(function() {
    					$scope.pagLog	 	= true;
						$scope.pagReg	 	= false;
  					},3000);

				}

			});

		}else{

			$scope.verPass	= true;

		}
	}
	
	/*===================================================
	=            abre la ventana de registro            =
	===================================================*/
	
	$scope.registro = function(){

		$scope.pagLog	 	= false;
		$scope.pagReg	 	= true;

	}
	
	/*=================================================
	=            vuelve a ventana de login            =
	=================================================*/
	
	$scope.volver = function(){

		$scope.pagLog	 	= true;
		$scope.pagReg	 	= false;
	}
	
	/*=====  End FUNCIONES ======*/
	

}]);






