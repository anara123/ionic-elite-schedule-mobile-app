(function () {
    'use strict';

    angular.module('eliteApp').controller('teamsCtrl', ['$scope', 'eliteApi', teamsCtrl]);

    function teamsCtrl($scope, eliteApi) {
        var vm = this;

        console.log('In teams-ctrl');
        vm.loadList = function(forceRefresher) {
            eliteApi.getLeagueData(forceRefresher).then(function(data) {
                vm.teams = data.teams;

                console.log(vm.teams);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete')
            });
        }

        vm.loadList(false);

    }

})();
