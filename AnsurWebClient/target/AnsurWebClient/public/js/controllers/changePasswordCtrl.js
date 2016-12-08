homeApp.controller('changePasswordCtrl',['$scope','$http','$modalInstance',
                                  function ($scope, $http, $uibModalInstance) {
             $scope.submitChangePassword = function submit() { 
            	 var username = localStorage.getItem('username');
                 var data = {
            	   userName: username,
                   oldPassword : $scope.currentPassword,
                   newPassword : $scope.newPassword                  
                 };
               var URL = "http://localhost:9763/AnsurNGSaaS/fluke/admin/updatePassword";
               var res = $http.post(URL, data);
               res.success(function(response, status, headers, config) {
                 console.log('Success: ',response);
                 swal({ 
                   title: 'Success',
                   text: 'Your password has been changed successfully'                 
                 });
               });
               res.error(function(response, status, headers, config) {
                 console.log('Error: ',response);
                 swal({ 
                   title: 'Failed',
                   text: 'Please enter the correct current password',
                   type: 'error' 
                 });
               });
               $uibModalInstance.close();
             };
             
             $scope.cancel = function cancel() {
               $uibModalInstance.dismiss('cancel');
             };
      }]);