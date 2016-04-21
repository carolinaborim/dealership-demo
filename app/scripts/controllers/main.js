/**
 * @ngdoc function
 * @name fuseTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fuseTestApp
 */

const attachDealersToEquipments = (equipments, dealers) => {
  const dealerNames = {};
  dealers.forEach((dealer) => {
    dealerNames[dealer.id] = dealer.name;
  });

  equipments.forEach((equipment, index) => {
    equipments[index].owner_name = null;
    equipments[index].dealer_name = dealerNames[equipment.links.dealer];
  });

  return equipments;
};

const indexById = (entities) => {
  const hash = {};

  entities.forEach((entity) => {
    hash[entity.id] = entity;
  });

  return hash;
};

const updateEquipmentEngineHours = (response, equipments) => {
  const trackingPoints = indexById(response.linked.trackingPoints);
  const duties = indexById(response.linked.duties);

  const states = {};
  const engineHours = {};
  const aggs = response.meta.aggregations.equip_agg;
  aggs.forEach((agg) => {
    const latest = agg.spn_ag[0].spn_latest_ag;
    const trackingPoint = trackingPoints[latest[0].links.trackingPoint];
    const duty = duties[trackingPoint.links.duty];

    engineHours[agg.key] = parseInt(latest[0].value / 3600, 10);
    states[agg.key] = duty.status;
  });

  equipments.forEach((equipment, index) => {
    equipments[index].engineHours = engineHours[equipment.id];
    equipments[index].status = states[equipment.id];
  });

  return equipments;
};

function MainController(ApiService, $scope) {
  ApiService.getEquipments()
    .then((response) => {
      const equipments = response.equipment;
      const dealers = response.linked.dealers;
      attachDealersToEquipments(equipments, dealers);
      return equipments;
    }).then((equipments) => {
      return ApiService.getEngineHours()
        .then((response) => updateEquipmentEngineHours(response, equipments));
    }).then((equipments) => {
      $scope.equipments = equipments;
    });
}
angular.module('fuseTestApp')
  .controller('MainCtrl', MainController);
