/**
 * @ngdoc function
 * @name fuseTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fuseTestApp
 */
function MainController(ApiService, $scope) {
  ApiService.getEquipments().then((getEquipmentsResponse) => {
    console.log('equipments', getEquipmentsResponse);
    const equipments = getEquipmentsResponse.equipment;
    const dealers = getEquipmentsResponse.linked.dealers;
    const trackingPoints = {};
    const duties = {};
    const states = {};
    const ownerNames = [];
    const dealerNames = [];
    console.log(getEquipmentsResponse);

    dealers.forEach((dealer) => {
      dealerNames[dealer.id] = dealer.name;
    });

    ApiService.getEngineHours().then((getEngineHoursResponse) => {
      console.log('engine hours', getEngineHoursResponse);

      getEngineHoursResponse.linked.trackingPoints.forEach((trackingPoint) => {
        trackingPoints[trackingPoint.id] = trackingPoint;
      });

      getEngineHoursResponse.linked.duties.forEach((duty) => {
        duties[duty.id] = duty;
      });

      const engineHours = [];
      const aggs = getEngineHoursResponse.meta.aggregations.equip_agg;
      console.log(getEngineHoursResponse);

      aggs.forEach((agg) => {
        const internAggs = agg.spn_ag[0].spn_latest_ag;
        const trackingPoint = trackingPoints[internAggs[0].links.trackingPoint];
        const duty = duties[trackingPoint.links.duty];

        engineHours[agg.key] = parseInt(internAggs[0].value / 3600, 10);
        states[agg.key] = duty.status;
      });

      equipments.forEach((equipment, n) => {
        equipments[n].owner_name = ownerNames[equipment.links.owner];
        equipments[n].dealer_name = dealerNames[equipment.links.dealer];
        equipments[n].engineHours = engineHours[equipment.id];
        equipments[n].status = states[equipment.id];
      });
    });

    ApiService.getAlarmDetails().then((getAlarmDetailsResponse) => {
      console.log('alarmDetails', getAlarmDetailsResponse);
      const alarmDetails = getAlarmDetailsResponse.alarmDetails;
      ApiService.getIssueOccurences().then((response) => {
        console.log('alerts', response);
        const linkedData = response.linked.issues;
        linkedData.forEach((data) => {
          const alarmDetailsByIssue = alarmDetails.filter((value) => {
            return value.id === data.links.alarmDetail;
          });
          equipments.forEach((equipment, n) => {
            if (equipment.id === data.equipmentId) {
              const severityNumber = alarmDetailsByIssue[0].severity;
              const severityName = `severity_${severityNumber}`;
              if (equipments[n][severityName]) {
                equipments[n][severityName]++;
              } else {
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
}
angular.module('fuseTestApp')
  .controller('MainCtrl', MainController);
