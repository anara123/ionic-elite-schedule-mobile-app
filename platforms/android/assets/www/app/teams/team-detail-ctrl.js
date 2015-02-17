(function() {
    'use strict';

    angular.module('eliteApp').controller('teamDetailCtrl', ['$stateParams', '$ionicPopup', '$ionicPlatform', '$cordovaVibration', 'myTeamsService', 'eliteApi', teamDetailCtrl]);

    function teamDetailCtrl($stateParams, $ionicPopup, $ionicPlatform, $cordovaVibration, myTeamsService, eliteApi) {
        var vm = this;

        console.log('$stateParams', $stateParams);

        vm.teamId = Number($stateParams.id);
        var team;

        eliteApi.getLeagueData().then(function(data) {

            team = _.chain(data.teams)
                .pluck("divisionTeams")
                .flatten()
                .find({'id': vm.teamId})
                .value();

            team = angular.extend(team, {leagueId: eliteApi.getLeagueId()})

            vm.teamName = team.name;

            vm.games = _.chain(data.games)
                .filter(isTeamInGame)
                .map(function (item) {
                    var isTeam1 = (item.team1Id === vm.teamId ? true : false);
                    var opponentName = isTeam1 ? item.team2 : item.team1;
                    var scoreDisplay = getScoreDisplay(isTeam1, item.team1Score, item.team2Score);
                    return {
                        gameId: item.id,
                        opponent: opponentName,
                        time: item.time,
                        location: item.location,
                        locationUrl: item.locationUrl,
                        scoreDisplay: scoreDisplay,
                        homeAway: (isTeam1 ? "vs." : "at")
                    };
                })
                .value();

            vm.teamStanding = _.chain(data.standings)
                .pluck('divisionStandings')
                .flatten()
                .find({ 'teamId': vm.teamId })
                .value();

        });

        vm.following = myTeamsService.isFollowingTeam(vm.teamId) === undefined ? false : true;

        vm.toggleFollow = function () {
            if (vm.following) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Unfollow?',
                    template: 'Are you sure you want to unfollow?'
                });

                confirmPopup.then(function (res) {
                    if (res) {
                        console.log('Unfollowing team. ', vm.teamId);
                        vm.following = !vm.following;
                        myTeamsService.unfollowTeam(vm.teamId);
                    }
                })
            }
            else {
                console.log('Following Team. ', team);
                vm.following = !vm.following;
                myTeamsService.followTeam(team);
            }
        }

        vm.toggleFollow2 = function () {
            $ionicPlatform.ready(function() {
                console.log("i'm ready");
                $cordovaVibration.vibrate(500)
            })
            if (vm.following) {
                console.log('Following team. ', team);
                myTeamsService.followTeam(team);
            }
            else {
                console.log('Unfollowing team. ', vm.teamId);
                myTeamsService.unfollowTeam(vm.teamId);
            }
        }

        function isTeamInGame(item) {
            return item.team1Id === vm.teamId || item.team2Id === vm.teamId;
        }

        function getScoreDisplay(isTeam1, team1Score, team2Score) {
            if (team1Score && team2Score) {
                var teamScore = (isTeam1 ? team1Score : team2Score);
                var opponentScore = (isTeam1 ? team2Score : team1Score);
                var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
                return winIndicator + teamScore + "-" + opponentScore;
            }
            else {
                return "";
            }
        }
    }

})();
