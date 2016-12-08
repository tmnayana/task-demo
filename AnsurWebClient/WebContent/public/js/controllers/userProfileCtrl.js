homeApp.controller('userProfileCtrl', [ '$scope', '$modalInstance',
function($scope, $uibModalInstance) {  
  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
}]);