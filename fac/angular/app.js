var app = angular.module( 'facturacionApp',[ 
		'ngRoute', 'jcs-autoValidate', 'ngFileUpload',
		'facturacionApp.configuracion',
		'facturacionApp.mensajes',
		'facturacionApp.notificaciones',
		'facturacionApp.clientes',
		'facturacionApp.automoviles',
		'facturacionApp.dashboardCrtl',
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
           


app.controller('mainCtrl', ['$scope', 'Configuracion','Mensajes', 'Notificaciones', function($scope, Configuracion,Mensajes, Notificaciones){
	
	// ================================================
	//   variables
	// ================================================
	$scope.config = {};
	$scope.mensajes = Mensajes.mensajes;
	$scope.notificaciones = Notificaciones.notificaciones;

	$scope.titulo    = "";
	$scope.subtitulo = "";

	$scope.usuario = {
		nombre:"Richard Vivas"
	}

	// cargar servicio de configuracion
	Configuracion.cargar().then( function(){
		$scope.config = Configuracion.config;
	});


	// ================================================
	//   Funciones Globales del Scope
	// ================================================
	$scope.activar = function( menu, submenu, titulo, subtitulo ){

		$scope.titulo    = titulo;
		$scope.subtitulo = subtitulo;

		$scope.mDashboard 		= "";
		$scope.mClientes  		= "";
		$scope.mAutomoviles  	= "";
		$scope.mComputadores  	= "";

		$scope[menu] = 'active';

	};  

}]);

// ================================================
//   Directivas
// ================================================


// ================================================
//   Rutas
// ================================================
app.config([ '$routeProvider', function($routeProvider){

	$routeProvider
		.when('/',{
			templateUrl: 'dashboard/dashboard.html',
			controller: 'dashboardCtrl'
		})
		.when('/clientes/:pag',{
			templateUrl: 'clientes/clientes.html',
			controller: 'clientesCtrl'
		})
		.when('/automoviles/:pag',{
			templateUrl: 'automoviles/automoviles.html',
			controller: 'automovilesCtrl'
		})
		.when('/computadores/:pag',{
			templateUrl: 'computadores/computadores.html',
			controller: 'computadoresCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})

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








