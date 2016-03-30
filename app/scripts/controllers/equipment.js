'use strict';

/**
 * @ngdoc function
 * @name fuseTestApp.controller:EquipmentctrlCtrl
 * @description
 * # EquipmentctrlCtrl
 * Controller of the fuseTestApp
 */
 angular.module('fuseTestApp')
 .controller('EquipmentCtrl', function ($routeParams, $scope, ApiService) {
 	var equipmentId = $routeParams.id;
 	//init map
 	$scope.map = {
 		center:{
 			latitude: 45,
 			longitude: -73
 		},
 		zoom: 1,
 		bounds: {}
 	};

 	//get equipment by id
 	ApiService.getEquipmentById(equipmentId).then(function(response){
 		$scope.equipment = response.equipment[0];
 		$scope.brand = response.linked.brands[0];
 		$scope.model = response.linked.models[0];
    $scope.dealer = response.linked.dealers[0];
 	});

 	//get equipment issues
 	ApiService.getIssueOccurencesByEquipmentId(equipmentId).then(function(response){
 		var linkedAlarms = response.linked.alarmDetails;
 		linkedAlarms.forEach( function(alarmDetail) {
 			var severityName = 'severity_' + alarmDetail.severity;
 			if ($scope.equipment[severityName]) {
 				$scope.equipment[severityName]++;
 			} else {
 				$scope.equipment[severityName] = 1;
 			}
 		});
 	});

 	//draw geofenceAlarms
 	$scope.polygons = [];
 	ApiService.getAlarmDetailsByEquipmentId(equipmentId).then(function(response){
 		//extract enabled geofenceAlarms
 		var geofenceAlarms = response.alarmDetails.filter(function(value){
 			return value.alarmType === "geofenceAlarm" && value.enabled === true;
 		});

 		var polygons = [];
 		//create polygons
 		geofenceAlarms.forEach( function(alarm, n) {
 			var coordinates = alarm.alarm.geospatial.coordinates[0];
 			var paths = [];
 			coordinates.forEach(function(coordinate) {
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

  ApiService.getEngineHours().then(function(response) {
    console.log('engine hours', response);
    $scope.engineHours = parseInt(response.meta.aggregations.equip_agg[0].spn_ag[0].spn_latest_ag[0].value / 3600); // convert seconds to hours
  });

 	$scope.$watch(function() {
 		return $scope.map.bounds;
 	}, function() {
 		ApiService.getTrackingPointsByEquipmentId(equipmentId).then(function(response){
 			console.log('tracking points', response);
      if(response.trackingPoints.length > 0) {
        $scope.trackingPoint = response.trackingPoints[0];
      }
 		});
 	}, true);
 });
