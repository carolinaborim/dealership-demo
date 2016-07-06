/**
 * @ngdoc function
 * @name fuseTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fuseTestApp
 */
function MainController(ApiService, $scope) {
  ApiService.getEquipment()
    .then((response) => {
      $scope.equipment = response.data;
    })
    .then(() => {
      const dealerId = $scope.equipment[0].relationship.dealer.data.id;
      return ApiService.getDealerById(dealerId)
        .then((dealer) => {
          $scope.dealerName = dealer.name;
        })
        .catch(() => {
          $scope.dealerName = 'N/A';
        });
    });
}
angular.module('fuseTestApp')
  .controller('MainCtrl', MainController);
