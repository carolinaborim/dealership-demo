'use strict';

/**
 * @ngdoc function
 * @name fuseTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fuseTestApp
 */
 angular.module('fuseTestApp')
 .controller('MainCtrl', function (ApiService,$scope) {
 	//get equipmens
 	ApiService.getEquipments().then(function(response){
 		console.log('equipments', response);
 		var equipments = response.equipment;
    var owners = response.linked.owners;
 		var dealers = response.linked.dealers;
    var trackingPoints = {};
    var duties = {};
    var states = {};
    var ownerNames = [];
 		var dealerNames = [];
 		console.log(response);

    dealers.forEach( function(dealer) {
			dealerNames[dealer.id] = dealer.name;
		});

		//get engine hours
		ApiService.getEngineHours().then(function(response) {
			console.log('engine hours', response);

      response.linked.trackingPoints.forEach( function(trackingPoint) {
  			trackingPoints[trackingPoint.id] = trackingPoint;
  		});

      response.linked.duties.forEach( function(duty) {
  			duties[duty.id] = duty;
  		});

			var engineHours = [];
			var aggs = response.meta.aggregations.equip_agg;
			console.log(response);

			//extract engine hours from aggregation
			aggs.forEach( function(agg) {
				var internAggs = agg.spn_ag[0].spn_latest_ag;
        var trackingPoint = trackingPoints[internAggs[0].links.trackingPoint];
        var duty = duties[trackingPoint.links.duty];

				engineHours[agg.key] = parseInt(internAggs[0].value / 3600);
        states[agg.key] = duty.status;
			});
			//decorate equipments with engine hours and owner names
			equipments.forEach( function(equipment, n) {
        equipments[n].owner_name = ownerNames[equipment.links.owner];
				equipments[n].dealer_name = dealerNames[equipment.links.dealer];
				equipments[n].engineHours = engineHours[equipment.id];
        equipments[n].status = states[equipment.id];
			});
		});

		//get list of alarms details it means all alarm registered for each equipment
		ApiService.getAlarmDetails().then(function(response) {
			console.log('alarmDetails', response);
			var alarmDetails = response.alarmDetails;
			//get list of issues means that is the list of alerts that was sent besed in alarms parameters
			//theres no way to get a count of issues based in equipments we need interact with them
			ApiService.getIssueOccurences().then(function(response){
				console.log('alerts',response);
				var linkedData = response.linked.issues;
				linkedData.forEach( function(data) {
					//filter alarm detail using issue relations
					var alarmDetailsByIssue = alarmDetails.filter(function(value){
						return value.id === data.links.alarmDetail;
					});
					//attach severity inside documents body
					equipments.forEach( function(equipment, n) {
						if(equipment.id === data.equipmentId){
							var severityNumber = alarmDetailsByIssue[0].severity;
							var severityName = 'severity_' + severityNumber;
							if (equipments[n][severityName]) {
								equipments[n][severityName]++;
							}else {
								equipments[n][severityName] = 1;
							}
						}
					});
				});
				$scope.equipments = equipments;
			});
		});
$scope.equipments = equipments;
});
});
