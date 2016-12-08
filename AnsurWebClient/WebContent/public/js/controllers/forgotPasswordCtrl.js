////////////////////////////////////////////////////////////
//Description : Forgot Password Controller - Email Address validation, Sends user activation link
//Author : Chintham VeeraReddy on 06-09-2016
//Modified By : None
//Version : 0.0.1
////////////////////////////////////////////////////////////
//Forgot Password Controller
loginApp.controller('forgotPasswordCtrl',['$scope','$http','$modalInstance', 
function forgotPasswordCtrl($scope, $http, $uibModalInstance) {
$scope.submitForgotPassword = function (isValid) {
    if(isValid) {   
           var data = {  
                userName : $scope.username,
                email : $scope.email
           };
      var URL = 'http://localhost:9763/AnsurNGSaaS/fluke/admin/resetPassword';
      var res = $http.post(URL, data);
      res.success(function(response, status, headers, config) {
      swal("Success", "Password has been sent to your email: "+ $scope.email);
           
      });
      res.error(function(response, status, headers, config) {  	 
      swal("Failed", "Forgot password failed, Please try again ", "error");
           
      });  
                  
      $uibModalInstance.close();  
    }        
}; // End of submitForgotPassword()

$scope.cancel = function () {
 $uibModalInstance.dismiss('cancel');
}; // End of cancel()
}]);
