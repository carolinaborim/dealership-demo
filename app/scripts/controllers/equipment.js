/**
 * @ngdoc function
 * @name fuseTestApp.controller:EquipmentctrlCtrl
 * @description
 * # EquipmentctrlCtrl
 * Controller of the fuseTestApp
 */
function EquipmentController($routeParams, $scope, ApiService) {
  const equipmentId = $routeParams.id;
  $scope.map = {
    center: {
      latitude: 45,
      longitude: -73
    },
    zoom: 1,
    bounds: {}
  };

  ApiService.getEquipmentById(equipmentId).then((response) => {
    $scope.equipment = response.data;
  });

}
angular.module('fuseTestApp')
  .controller('EquipmentCtrl', EquipmentController);
