angular.module('OWMApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl'
        }).when('/cities/:city', {
            templateUrl : 'city.html',
            controller : 'CityCtrl',
            resolve : {
            	city : function(owmCities, $route, $location) {
            		var city = $route.current.params.city;
            		if(owmCities.indexOf(city) === -1) {
			        $location.path('/error');
			        return;
	    			}
	    			return city;
            	}
            }
        }).when('/error', {
        	template: '<p> Error - Page Not Found </p>'
        }).otherwise('/error');
    }])
    .run(['$rootScope', '$location', function($rootScope, $location) {
			$rootScope.$on('$routeChangeError', function() {
				$location.path('/error');
			});
	}])
    .controller('HomeCtrl', function($scope) {
        //empty for now
    })
	.controller('CityCtrl', function($scope, city) {
	    $scope.city = city;
	})
    .value('owmCities', ['New York', 'Dallas', 'Chicago']);