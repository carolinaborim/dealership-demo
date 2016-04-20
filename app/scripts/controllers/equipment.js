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
    $scope.equipment = response.equipment[0];
    $scope.brand = response.linked.brands[0];
    $scope.model = response.linked.models[0];
    $scope.dealer = response.linked.dealers[0];
  });

  ApiService.getIssueOccurencesByEquipmentId(equipmentId).then((response) => {
    const linkedAlarms = response.linked.alarmDetails;
    linkedAlarms.forEach((alarmDetail) => {
      const severityName = `severity_${alarmDetail.severity}`;
      if ($scope.equipment[severityName]) {
        $scope.equipment[severityName]++;
      } else {
        $scope.equipment[severityName] = 1;
      }
    });
  });

  $scope.polygons = [];
  ApiService.getAlarmDetailsByEquipmentId(equipmentId).then((response) => {
    const geofenceAlarms = response.alarmDetails.filter((value) => {
      return value.alarmType === 'geofenceAlarm' && value.enabled === true;
    });

    const polygons = [];
    geofenceAlarms.forEach((alarm, n) => {
      const coordinates = alarm.alarm.geospatial.coordinates[0];
      const paths = [];
      coordinates.forEach((coordinate) => {
        paths.push({
          latitude: coordinate[1],
          longitude: coordinate[0]
        });
      });
      console.log(paths);
      polygons.push(
        {
          id: n,
          path: paths,
          stroke: {
            color: '#6060FB',
            weight: 3
          },
          editable: false,
          draggable: false,
          geodesic: false,
          visible: true,
          fill: {
            color: '#ff0000',
            opacity: 0.8
          }
        }
      );
    });

    $scope.polygons = polygons;
  });

  ApiService.getEngineHours().then((response) => {
    console.log('engine hours', response);
    const variableValue = response
            .meta
            .aggregations
            .equip_agg[0]
            .spn_ag[0]
            .spn_latest_ag[0]
            .value;
    $scope.engineHours = parseInt(variableValue / 3600, 10);
  });

  $scope.$watch(() => {
    return $scope.map.bounds;
  }, () => {
    ApiService.getTrackingPointsByEquipmentId(equipmentId).then((response) => {
      console.log('tracking points', response);
      if (response.trackingPoints.length > 0) {
        $scope.trackingPoint = response.trackingPoints[0];
      }
    });
  }, true);
}
angular.module('fuseTestApp')
  .controller('EquipmentCtrl', EquipmentController);
