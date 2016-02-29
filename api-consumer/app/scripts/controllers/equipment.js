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
 		$scope.owner = response.linked.owners[0];
 	});

 	//get equipment issues
 	ApiService.getIssueOccurencesByEquipmentId(equipmentId).then(function(response){
 		var linkedAlarms = response.linked.alarmDetails;
 		linkedAlarms.forEach( function(alarmDetail) {
 			var severityName = 'severity_' + alarmDetail.severity; 
 			if ($scope.equipment[severityName]) {
 				$scope.equipment[severityName]++;
 			}else {
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

 	//create markers
 	$scope.markers = [];
 	$scope.$watch(function() {
 		return $scope.map.bounds;
 	}, function() {
 		var markers = [];
 		ApiService.getTrackingPointsByEquipmentId(equipmentId).then(function(response){
 			console.log('tracking points', response);
 			var trackingPoints = response.trackingPoints;
 			trackingPoints.forEach( function(trackingPoint, n) {
 				markers.push({
 					id: n,
 					coords: {
 						latitude: trackingPoint.location.coordinates[1],
 						longitude: trackingPoint.location.coordinates[0]
 					},
 					icon: 'http://icons.iconarchive.com/icons/fatcow/farm-fresh/16/tractor-icon.png'
 				});
 			});
 			if(markers.length){
 				$scope.map = { 
 					center: 
 					{ 
 						latitude: markers[0].coords.latitude,
 						longitude: markers[0].coords.longitude 
 					},
 					zoom: 50,
 					bounds: {}
 				};
 				$scope.markers = markers;
 			}
 		});
 	}, true);
 });
