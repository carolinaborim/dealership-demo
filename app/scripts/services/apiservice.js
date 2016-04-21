/**
 * @ngdoc service
 * @name fuseTestApp.ApiService
 * @description
 * # ApiService
 * Service in the fuseTestApp.
 */
function ApiService(Config, $http) {
  $http.defaults.headers.common.Authorization = Config.BEARER_TOKEN;

  function getEquipments() {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_TRACKERS_URL}/equipment?` +
        'include=model,owner,dealer,tracker,model.equipmentType,' +
        'model.series,model.series.brand'
    }).then((response) => {
      return response.data;
    });
    return request;
  }

  function getEquipmentById(id) {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_TRACKERS_URL}/equipment/${id}?` +
        'include=model,owner,tracker,dealer,model.equipmentType,' +
        'model.series,model.series.brand'
    }).then((response) => {
      return response.data;
    });
    return request;
  }

  function getEngineHours() {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_TRACKERS_URL}/trackingData/search?` +
        'include=trackingPoint%2CtrackingPoint.duty&' +
        'links.canVariable.name=ENGINE_HOURS&' +
        'aggregations=equip_agg&' +
        'equip_agg.property=links.trackingPoint.equipment.id&' +
        'equip_agg.aggregations=spn_ag%2Ctp_latest_ag&' +
        'spn_ag.property=links.canVariable.name&' +
        'spn_ag.aggregations=spn_latest_ag&' +
        'spn_latest_ag.type=top_hits&' +
        'spn_latest_ag.sort=-links.trackingPoint.timeOfOccurrence&' +
        'spn_latest_ag.limit=1&' +
        'spn_latest_ag.include=canVariable%2CcanVariable.standardUnit&' +
        'tp_latest_ag.type=top_hits&' +
        'tp_latest_ag.sort=-links.trackingPoint.timeOfOccurrence&' +
        'tp_latest_ag.limit=1&' +
        'tp_latest_ag.fields=links.trackingPoint&' +
        'tp_latest_ag.include=trackingPoint'
    }).then((response) => {
      return response.data;
    });
    return request;
  }

  function getIssueOccurences() {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_EM_URL}/issueOccurrences?` +
        'include=issue&isResolved=false&limit=0&' +
        'sort=alert.timeOfOccurrence'
    }).then((response) => {
      return response.data;
    });
    return request;
  }

  function getIssueOccurencesByEquipmentId(equipmentId) {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_EM_URL}/issueOccurrences?` +
        `alert.links.equipment=${equipmentId}&` +
        'isResolved=false&' +
        'include=issue,issue.alarmDetail&' +
        'isResolved=true&sort=alert.timeOfOccurrence'
    }).then((response) => {
      return response.data;
    });
    return request;
  }

  function getAlarmDetails() {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_EM_URL}/alarmDetails`
    }).then((response) => {
      return response.data;
    });
    return request;
  }

  function getTrackingPointsByEquipmentId(equipmentId) {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_TRACKERS_URL}/trackingPoints?` +
        `include=duty&limit=5000&links.equipment=${equipmentId}`
    }).then((response) => {
      return response.data;
    });
    return request;
  }

  function getAlarmDetailsByEquipmentId(equipmentId) {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_EM_URL}/alarmDetails?` +
        `alarm.links.equipment=${equipmentId}`
    }).then((response) => {
      return response.data;
    });
    return request;
  }

  return {
    getEquipments,
    getEngineHours,
    getIssueOccurences,
    getAlarmDetails,
    getEquipmentById,
    getIssueOccurencesByEquipmentId,
    getTrackingPointsByEquipmentId,
    getAlarmDetailsByEquipmentId
  };
}
angular.module('fuseTestApp')
  .factory('ApiService', ApiService);
