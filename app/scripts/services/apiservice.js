/**
 * @ngdoc service
 * @name fuseTestApp.ApiService
 * @description
 * # ApiService
 * Service in the fuseTestApp.
 */
function ApiService(Config, $http) {
  $http.defaults.headers.common.Authorization = Config.BEARER_TOKEN;

  const getEquipment = () => {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_EQUIPMENT_API_URL}/equipment`
    }).then((response) => {
      return response.data;
    });
    return request;
  };

  const getEquipmentById = (id) => {
    const request = $http({
      method: 'GET',
      url: `${Config.FUSE_EQUIPMENT_API_URL}/equipment/${id}`
    }).then((response) => {
      return response.data;
    });
    return request;
  };

  const getDealerById = (dealerId) => {
    return $http({
      method: 'GET',
      url: `${Config.DEALER_API_URL}/dealer/${dealerId}`
    }).then((response) => {
      return response.data.dealers[0];
    });
  };

  return {
    getEquipment,
    getEquipmentById,
    getDealerById
  };


}

angular.module('fuseTestApp')
  .factory('ApiService', ApiService);
