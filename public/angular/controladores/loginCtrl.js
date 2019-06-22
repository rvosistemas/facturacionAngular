var app = angular.module('loginApp.loginCtrl', []);

// ================================================
//   Controlador de Dashboard
// ================================================
app.controller('loginCtrl', ['$scope', 'LoginService', function($scope,  LoginService ){
	
	// ================================================
	//   Variables
	// ================================================
	$scope.activar('mLogin','','Login','Logueo');

    $scope.datosLogin = {};
    
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

        LoginService.login( datos )
            .then( function( data ){

            console.log( data );

			// TODO... continuar
			if( data.err ){

				$scope.invalido = true;
				$scope.cargando = false;
				$scope.mensaje  = data.mensaje;

			}else{

				console.log( data.mensaje );
				window.location = data.url;

			}

            })
        ;


	}


    
}]);
