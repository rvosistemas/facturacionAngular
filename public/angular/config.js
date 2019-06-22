// ================================================
//   Rutas
// ================================================
app.config( function($routeProvider){

	$routeProvider
		.when('/',{
			templateUrl: 'publico.html',
			controller: 'mainCtrl'
		})
		.when('/login',{
			templateUrl: 'login.html',
			controller: 'loginCtrl'
		})
		.when('/registro',{
			templateUrl: 'registro.html',
			controller: 'registroCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});

});