homeApp.controller('addSubscriptionCtrl',['$scope','$modalInstance',function ($scope,$uibModalInstance) {	
	$scope.cancel = function cancel() {
		$uibModalInstance.dismiss('cancel');
	};
}]);
