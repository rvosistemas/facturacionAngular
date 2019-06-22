var app = angular.module('loginApp.registroCtrl', []);

// ================================================
//   Controlador de Dashboard
// ================================================
app.controller('registroCtrl', ['$scope', function($scope){
	
	// ================================================
	//   Variables
	// ================================================
	$scope.activar('mRegistro','','Registro','Registro');

	$scope.datosRegistro = {};
    
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
						$scope.pagPub	 	= false;
  					},3000);

				}

			});

		}else{

			$scope.verPass	= true;

		}
	}

    
}]);