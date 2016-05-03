/**
 * @ngdoc function
 * @name fuseTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fuseTestApp
 */
function MainController(ApiService, $scope) {
  ApiService.getEquipment()
    .then((response) => {
      return response;
    }).then((equipment) => {
      $scope.equipment = equipment.data;
    });
}
angular.module('fuseTestApp')
  .controller('MainCtrl', MainController);
