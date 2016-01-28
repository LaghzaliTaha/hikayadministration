(function(){
  var app = angular.module('Routes', []);
    app.config(function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state("Home",{
          url:"/",
          templateUrl: "home.html"
        })

        .state('api', {
        url: "/api/:id",
        templateUrl: 'api.html',
        controller: 'GetControllers'
        })

        .state("page",{
          url:"/page",
          templateUrl: "page.html"
        })
        .state("login",{
          url:"/login",
          templateUrl: "login.html"
        })
        $urlRouterProvider.otherwise("/");
    })
  })();
