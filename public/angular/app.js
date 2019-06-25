var app = angular.module( 'loginApp',[
	'ngRoute',
	'loginApp.loginService',
	'loginApp.configuracion',
	'loginApp.categoriasService',
	'loginApp.productosService',
	'loginApp.loginCtrl',
	'loginApp.productosCtrl',
	'loginApp.registroCtrl'
]);


app.controller('mainCtrl', ['$scope', 'Configuracion', 'categoriasService', 'productosService', function( $scope, Configuracion, categoriasService, productosService ){
	
	// ================================================
	//   variables
	// ================================================

	$scope.invalido 	= false;
	$scope.cargando 	= false;
	$scope.verPass	 	= false;
	$scope.mensaje  	= "";

	$scope.datos 		= {};
	$scope.usuario 		= {};
	$scope.config 		= {};
	$scope.categorias 	= {};
	$scope.productos 	= {};
	$scope.productoSel 	= {};

	$scope.titulo    = "";
	$scope.subtitulo = "";

	// ====================================
	// = Funcion mostral modal detalles   =
	// ====================================

	$scope.mostrarDetalles = function( producto ){

		angular.copy( producto, $scope.productoSel );
		$("#modal_detalles").modal();

	};  

	// cargar categorias
	categoriasService.cargar().then( function(){
		$scope.categorias = categoriasService.categorias;
		//console.log( "categorias en app: "+JSON.stringify($scope.categorias) );
	});

	// cargar productos
	productosService.cargarAutos().then( function(){
		$scope.productos = productosService.automoviles;
		//console.log( "productos en app: "+JSON.stringify($scope.productos) );
	});

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

		$scope.mInicio		= "";
		//$scope.mCategorias		= "";
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






