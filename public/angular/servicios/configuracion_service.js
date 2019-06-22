var app = angular.module('loginApp.configuracion',[]);


app.factory('Configuracion', ['$http', '$q', function($http, $q){
	
	var self = {

		config:{},
		
		cargar: function(){

			var d = $q.defer();

			$http({ method: "GET", url: 'configuracion.json'})
				.then(function(data){

					self.config = data.data;
					d.resolve();


				},
				function (error){

					d.reject();
					console.error("No se pudo cargar el archivo de configuración");

				});

			return d.promise;
		}

	};

	return self;

}])