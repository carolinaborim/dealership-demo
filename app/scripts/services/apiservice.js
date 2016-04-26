/**
 * @ngdoc service
 * @name fuseTestApp.ApiService
 * @description
 * # ApiService
 * Service in the fuseTestApp.
 */
function ApiService(Config, $http) {
  $http.defaults.headers.common.Authorization = Config.BEARER_TOKEN;

  const getEquipments = () => {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_EQUIPMENT_API_URL}/equipments`
    }).then((response) => {
      return response.data;
    });
    return request;
  };

  const getEquipmentById = (id) => {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_EQUIPMENT_API_URL}/equipments/${id}?`
    }).then((response) => {
      return response.data;
    });
    return request;
  };

  return {
    getEquipments,
    getEquipmentById
  };
}

angular.module('fuseTestApp')
  .factory('ApiService', ApiService);
