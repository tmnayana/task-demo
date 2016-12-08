////////////////////////////////////////////////////////////////////////////////
// Description : Custom Directive for Comparing New Password and Confirm Password
// Author: Chintham VeeraReddy on 11-06-2016
// Modified By : None
// Version : 0.0.1
////////////////////////////////////////////////////////////////////////////////
homeApp.directive("compareTo", function() {
  return {
    require : "ngModel",
    scope : {
	    confirmPasswordValue : "=compareTo"
    },
	  link : function(scope, element, attributes, ngModel) {
	    ngModel.$validators.compareTo = function(newPasswordValue) {
  		  return newPasswordValue === scope.confirmPasswordValue;	  
		  }; // End of validator
		  scope.$watch("confirmPasswordValue", function() {
		    ngModel.$validate();
		  }); // End of watch()
    } // End of link()
  };
}); // End of Directive for Comparing New Password and Confirm Password