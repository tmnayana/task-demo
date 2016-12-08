////////////////////////////////////////////////////////////////
// Description : Add Customer Controller
// Author : Chintham VeeraReddy on 10-06-2016
// Modified By : None
// Version : 0.0.1
///////////////////////////////////////////////////////////////
homeApp.controller('addCustomerCtrl',['$scope','$http','$modalInstance','showDeactivated','$rootScope', 
function ($scope,$http, $uibModalInstance, showDeactivated, $rootScope) {	
  $scope.submitAddCustomer = function (isValid) {	 
        if(isValid) {            
            var data = {
            		tenantDomain : $scope.domainName,
                    orgName : $scope.organizationName,
                    userName : $scope.email,
                    email : $scope.email,
                    contactPersonName : $scope.contactpersonName,
                    phNumber: $scope.phoneNumber,
                    location : $scope.location,
                    taxID : $scope.tax
            };
            var URL =  'http://localhost:9763/AnsurNGSaaS/fluke/admin/addTenant';           
            var res = $http.post(URL, data);
            res.success(function(response, status, headers, config) {
            	$rootScope.getCustomerAccountsData(showDeactivated);
            	$uibModalInstance.dismiss('cancel');
            	 swal({ 
                     title: 'Success',
                     text: 'Customer Creation Success',
                     type: 'success'
                 });            	
            });
            res.error(function(response, status, headers, config) {
                swal({ 
                  title: 'Failed',
                  text: 'Customer Creation Failed, Please try again ',
                  type: 'error' 
                 });
            });             
        } // End of isValid()          
  }; 
  $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
}]);// End of submitAddCustomer()