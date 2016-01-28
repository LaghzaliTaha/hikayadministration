(function(){
  var app = angular.module('Routes', []);
    app.config(function($stateProvider, $urlRouterProvider){
      $stateProvider
        .state("home",{
          url:"/",
          templateUrl: "addStory.html",
        })

  .state('modifyArt', {
          url: '/modifyArt/:id_art',
          templateUrl: 'modifyArt.html',
          controller:'modifyArtController'
              })

  .state('addPart', {
        url: "/addPart/:id",
        templateUrl: 'addPart.html',
        controller: 'addPartController'
        })

  .state('editPart', {
        url: '/editPart/:id_art?id_part?part_content',
        templateUrl: 'editPart.html',
        controller:'modifyPartController'
                    })

  .state('stories', {
        url: "/storiesShow",
        templateUrl: 'storiesShow.html',
        controller: 'StoryController'
        })

  .state('question', {
        url: "/question/:id",
        templateUrl: 'question.html',
        controller:'questionController'
      })

$urlRouterProvider.otherwise("/");
    })
  })();
