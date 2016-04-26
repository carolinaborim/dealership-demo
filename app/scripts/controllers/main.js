/**
 * @ngdoc function
 * @name fuseTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fuseTestApp
 */
function MainController(ApiService, $scope) {
  ApiService.getEquipments()
    .then((response) => {
      return response;
    }).then((equipments) => {
      $scope.equipments = equipments.data;
    });
}
angular.module('fuseTestApp')
  .controller('MainCtrl', MainController);
