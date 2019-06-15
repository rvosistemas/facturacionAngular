var app = angular.module( 'facturacionApp',[ 
		'ngRoute', 
		'jcs-autoValidate', 
		'ngFileUpload',
		'facturacionApp.configuracion',
		'facturacionApp.mensajes',
		'facturacionApp.notificaciones',
		'facturacionApp.dashboard',
		'facturacionApp.clientes',
		'facturacionApp.usuario',
		'facturacionApp.categorias',
		'facturacionApp.automoviles',
		'facturacionApp.dashboardCrtl',
		'facturacionApp.categoriasCtrl',
		'facturacionApp.clientesCrtl',
		'facturacionApp.automovilesCrtl'
		]);

angular.module('jcs-autoValidate')
.run([
    'defaultErrorMessageResolver',
    function (defaultErrorMessageResolver) {
        // To change the root resource file path
        defaultErrorMessageResolver.setI18nFileRootPath('angular/lib');
        defaultErrorMessageResolver.setCulture('es-co');
    }
]);
           


app.controller('mainCtrl', ['$scope', 'Configuracion', 'Mensajes', 'Notificaciones', 'Usuario', function($scope, Configuracion, Mensajes, Notificaciones, Usuario){
	
	// ================================================
	//   variables
	// ================================================
	$scope.mensajes 		= Mensajes.mensajes;
	$scope.notificaciones 	= Notificaciones.notificaciones;
	$scope.config 			= {};
	$scope.usuario 			= {};

	$scope.titulo    = "";
	$scope.subtitulo = "";


	// cargar servicio de configuracion
	Configuracion.cargar().then( function(){
		$scope.config = Configuracion.config;
	});

	// cargar info de usuario
	Usuario.cargarUsuario().then( function(){
		$scope.usuario = Usuario.usuario;
		console.log ("datos usuario JSON: "+JSON.stringify( $scope.usuario ) );
		if( $scope.usuario.foto == ""  ){
			$scope.usuario.foto = "default.png";
		}
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








