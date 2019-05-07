var app = angular.module('facturacionApp.dashboard',[]);

app.factory('Dashboard', ['$http', '$q', function($http, $q){


	var self = {

		'cargando'		: false,
		'err'     		: false, 
		'autos' 		: [],

		// ================================================
		//   SERVICIO PARA CARGAR DATOS AUTOS
		// ================================================
		
		cargarDatosAutos: function(){

			var d = $q.defer();

			$http({ method: "GET", url: 'php/dashboard/get.chartDatosAuto.php'})
	            .then(function (datos) {
	            	//console.log("categorias servicio autos: "+JSON.stringify(datos));
	            	self.autos = datos.data;
	                return d.resolve();

	            })
	            .catch(function (err) {
	                console.log("error al traer datos de chart autos: "+err);
	                return d.reject();

	            })	
            ;

			return d.promise;
		}

		// -------------------------------------------- //
	};

	return self;

}]);