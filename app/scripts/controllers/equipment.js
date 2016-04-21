/**
 * @ngdoc function
 * @name fuseTestApp.controller:EquipmentctrlCtrl
 * @description
 * # EquipmentctrlCtrl
 * Controller of the fuseTestApp
 */

const getEngineHours = (response) => {
  const value = response
    .meta
    .aggregations
    .equip_agg[0]
    .spn_ag[0]
    .spn_latest_ag[0]
    .value;

  return parseInt(value / 3600, 10);
};

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
    $scope.equipment = response.equipment[0];
    $scope.brand = response.linked.brands[0];
    $scope.model = response.linked.models[0];
    $scope.dealer = response.linked.dealers[0];
  });

  ApiService.getEngineHours()
    .then(getEngineHours)
    .then((engineHours) => { $scope.engineHours = engineHours; });

  const watchExpression = () => {
    return $scope.map.bounds;
  };

  const listener = () => {
    ApiService.getTrackingPointsByEquipmentId(equipmentId).then((response) => {
      if (response.trackingPoints.length > 0) {
        $scope.trackingPoint = response.trackingPoints[0];
      }
    });
  };

  $scope.$watch(watchExpression, listener, true);
}
angular.module('fuseTestApp')
  .controller('EquipmentCtrl', EquipmentController);
