// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('eliteApp', ['ionic', 'angular-data.DSCacheFactory', 'uiGmapgoogle-maps', 'ngCordova'])

app.run(function($ionicPlatform, DSCacheFactory) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }

        DSCacheFactory("leagueDataCache", { storageMode: "localStorage", maxAge: 20000, deleteOnExpire: "aggressive" });
        DSCacheFactory("leaguesCache", { storageMode: "localStorage", maxAge: 20000, deleteOnExpire: "aggressive" });
        DSCacheFactory("myTeamsCache", { storageMode: "localStorage"});
        DSCacheFactory("staticCache", { storageMode: "localStorage"});

    });
})

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            abstract: true,
            url: "/home",
            templateUrl: "app/home/home.html"
        })
        .state('home.leagues', {
            cache: false,
            url: "/leagues",
            views: {
                "tab-leagues": {
                    templateUrl: "app/home/leagues.html"
                }
            }
        })
        .state('home.myteams', {
            cache: false,
            url: "/myteams",
            views : {
                "tab-myteams": {
                    templateUrl: "app/home/myteams.html"
                }
            }
        })
        .state('app', {
            cache: false,
            url: "/app",
            abstract: true,
            templateUrl: "app/layout/main-layout.html"
        })
        .state('app.teams', {
            cache: false,
            url: "/teams",
            views: {
                "mainContent" : {
                    templateUrl: "app/teams/teams.html"
                }
            }
        })
        .state('app.team-details', {
            cache: false,
            url: "/teams/:id",
            views: {
                "mainContent" : {
                    templateUrl: "app/teams/team-details.html"
                }
            }
        })
        .state('app.game', {
            url: "/game/:id",
            views: {
                "mainContent" : {
                    templateUrl: "app/game/game.html"
                }
            }
        })
        .state('app.standings', {
            cache: false,
            url: "/standings",
            views: {
                "mainContent" : {
                    templateUrl: "app/standings/standings.html"
                }
            }
        })
        .state('app.locations', {
            cache: false,
            url: "/locations",
            views: {
                "mainContent" : {
                    templateUrl: "app/locations/locations.html"
                }
            }
        })
        .state('app.location-map', {
            cache: false,
            url: "/location-map/:id",
            views: {
                "mainContent" : {
                    templateUrl: "app/locations/location-map.html"
                }
            }
        })
        .state('app.rules', {
            url: "/rules",
            views: {
                "mainContent" : {
                    templateUrl: "app/rules/rules.html"
                }
            }
        });

    $urlRouterProvider.otherwise('/home/leagues');
});

angular.module('eliteApp').controller('eliteCtrl', ['$scope', function($scope) {

}]);


angular.module('eliteApp').controller('mvHomeCtrl', ['$scope', function($scope) {

}]);
