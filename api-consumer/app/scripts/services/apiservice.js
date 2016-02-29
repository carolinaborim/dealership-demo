'use strict';

/**
 * @ngdoc service
 * @name fuseTestApp.ApiService
 * @description
 * # ApiService
 * Service in the fuseTestApp.
 */
 angular.module('fuseTestApp')
 .factory('ApiService', function ($http) {

 	$http.defaults.headers.common.Authorization = 'Bearer 6c1fec33-7a48-46e7-a565-3dcc39a8c9f4';

 	function getEquipments() {
 		var request = $http({
 			method: 'GET',
 			url: 'http://agco-fuse-trackers-dev.herokuapp.com/equipment?include=model,owner,tracker,model.equipmentType,model.series,model.series.brand'
 		}).then(function (response) {
 			return response.data;
 		});
 		return request;
 	}
 	function getEquipmentById(id) {
		var request = $http({
 			method: 'GET',
 			url: 'http://agco-fuse-trackers-dev.herokuapp.com/equipment/'+id+'?include=model,owner,tracker,model.equipmentType,model.series,model.series.brand'
 		}).then(function (response) {
 			return response.data;
 		});
 		return request;
 	}

 	function getEngineHours() {
 		var request = $http({
 			method: 'GET',
 			url: 'http://agco-fuse-trackers-dev.herokuapp.com/trackingData/search?include=trackingPoint&links.canVariable.name=ENGINE_HOURS&aggregations=equip_agg&equip_agg.property=links.trackingPoint.equipment.id&equip_agg.aggregations=spn_ag%2Ctp_latest_ag&spn_ag.property=links.canVariable.name&spn_ag.aggregations=spn_latest_ag&spn_latest_ag.type=top_hits&spn_latest_ag.sort=-links.trackingPoint.timeOfOccurrence&spn_latest_ag.limit=1&spn_latest_ag.include=canVariable%2CcanVariable.standardUnit&tp_latest_ag.type=top_hits&tp_latest_ag.sort=-links.trackingPoint.timeOfOccurrence&tp_latest_ag.limit=1&tp_latest_ag.fields=links.trackingPoint&tp_latest_ag.include=trackingPoint'
 		}).then(function (response) {
 			return response.data;
 		});
 		return request;
 	}

 	function getIssueOccurences() {
 		var request = $http({
 			method: 'GET',
 			url: 'http://fuse-em-api-dev.herokuapp.com/issueOccurrences?include=issue&isResolved=false&limit=0&sort=alert.timeOfOccurrence'
 		}).then(function (response) {
 			return response.data;
 		});
 		return request;
 	}

 	function getIssueOccurencesByEquipmentId(equipmentId) {
 		var request = $http({
 			method: 'GET',
 			url: 'http://fuse-em-api-dev.herokuapp.com/issueOccurrences?alert.links.equipment='+equipmentId+'&isResolved=false&include=issue,issue.alarmDetail&isResolved=true&sort=alert.timeOfOccurrence'
 		}).then(function (response) {
 			return response.data;
 		});
 		return request;
 	}

 	function getAlarmDetails() {
 		var request = $http({
 			method: 'GET',
 			url: 'http://fuse-em-api-dev.herokuapp.com/alarmDetails'
 		}).then(function (response) {
 			return response.data;
 		});
 		return request;
 	}

	function getTrackingPointsByEquipmentId(equipmentId) {
		var request = $http({
 			method: 'GET',
 			url: 'http://agco-fuse-trackers-dev.herokuapp.com/trackingPoints?include=duty&limit=5000&links.equipment=' + equipmentId
 		}).then(function (response) {
 			return response.data;
 		});
 		return request;
	}
	 
	 function getAlarmDetailsByEquipmentId(equipmentId) {
		var request = $http({
 			method: 'GET',
 			url: 'http://fuse-em-api-dev.herokuapp.com/alarmDetails?alarm.links.equipment=' + equipmentId
 		}).then(function (response) {
 			return response.data;
 		});
 		return request;
	 }

 	return {
 		getEquipments:getEquipments,
 		getEngineHours:getEngineHours,
 		getIssueOccurences:getIssueOccurences,
 		getAlarmDetails:getAlarmDetails,
 		getEquipmentById:getEquipmentById,
 		getIssueOccurencesByEquipmentId:getIssueOccurencesByEquipmentId,
 		getTrackingPointsByEquipmentId:getTrackingPointsByEquipmentId,
 		getAlarmDetailsByEquipmentId:getAlarmDetailsByEquipmentId
 	};
 });
