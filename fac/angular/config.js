// ================================================
//   Rutas
// ================================================
app.config( function($routeProvider){

	$routeProvider
		.when('/',{
			templateUrl: 'vistas/dashboard/dashboard.html',
			controller: 'dashboardCtrl'
		})
		.when('/categorias',{
			templateUrl: 'vistas/categorias/categorias.html',
			controller: 'categoriasCtrl'
		})
		.when('/clientes/:pag',{
			templateUrl: 'vistas/clientes/clientes.html',
			controller: 'clientesCtrl'
		})
		.when('/automoviles/:pag',{
			templateUrl: 'vistas/automoviles/automoviles.html',
			controller: 'automovilesCtrl'
		})
		.when('/computadores/:pag',{
			templateUrl: 'vistas/computadores/computadores.html',
			controller: 'computadoresCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});

});