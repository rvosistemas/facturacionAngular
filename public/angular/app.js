var app = angular.module( 'loginApp',[
	'ngRoute',
	'loginApp.loginService',
	'loginApp.configuracion',
	'loginApp.loginCtrl',
	'loginApp.registroCtrl'
]);


app.controller('mainCtrl', ['$scope', 'Configuracion', function( $scope, Configuracion ){
	
	// ================================================
	//   variables
	// ================================================

	$scope.invalido 	= false;
	$scope.cargando 	= false;
	$scope.verPass	 	= false;
	$scope.mensaje  	= "";

	$scope.datos 	= {};
	$scope.usuario 	= {};
	$scope.config 	= {};

	$scope.titulo    = "";
	$scope.subtitulo = "";

	// cargar servicio de configuracion
	Configuracion.cargar().then( function(){
		$scope.config = Configuracion.config;
	});

	// ==============================================================================
	//   Funciones Globales del Scope para poner titulos y subtitulos a las paginas
	// ==============================================================================
	$scope.activar = function( menu, submenu, titulo, subtitulo ){

		$scope.titulo    = titulo;
		$scope.subtitulo = subtitulo;

		$scope.mDashboard 		= "";
		$scope.mCategorias		= "";
		$scope.mClientes  		= "";
		$scope.mAutomoviles  	= "";
		$scope.mComputadores  	= "";

		$scope[menu] = 'active';

	};  

	/*=====  End FUNCIONES ======*/

	$scope.activar('mInicio','','Inicio','Productos');

}]);

// ================================================
//   Directivas
// ================================================

// se modifica una directiva parecida a un filtro para que en hmtl se pueda mostrar como dinero algun numero dado
// por ejemplo 2000000 pasa a ser $2,000,000.00 
app.directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });

            elem.bind('blur', function(event) {
                var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
            });
        }
    };
}]);


// ================================================
//   Filtros
// ================================================
app.filter( 'quitarletra', function(){

	return function(palabra){
		if( palabra ){
			if( palabra.length > 1)
				return palabra.substr(1);
			else
				return palabra;
		}
	}
})

.filter( 'mensajecorto', function(){

	return function(mensaje){
		if( mensaje ){
			if( mensaje.length > 35)
				return mensaje.substr(0,35) + "...";
			else
				return mensaje;
		}
	}
})






