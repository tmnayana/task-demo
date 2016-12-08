homeApp.controller('customerInfoCtrl', [ '$scope', '$rootScope', '$location', '$uibModal',
function($scope, $rootScope, $location, $uibModal) {
	
	$scope.getCustomerStatus = function(result) {
		// 2 - Invitation Sent and 1 - Active and 0 - Deactivated
		 var status = result.status;				
		 switch(status) {
		 case 2 : $scope.status = 'Invitation Sent';		 					
		 		  $scope.showDeactiveStatusButton = false;		 					
		 		  $scope.showActiveStatusButton = false;
		 		  $scope.showResendInvitationStatusButton= true;
		 		  $scope.statusImagePath = '../public/assets/images/import_BG_1x.png';
		 		  break;
		 case 1 : $scope.status = 'Active';
		 		  $scope.showDeactiveStatusButton = true;		 				
		 		  $scope.showActiveStatusButton = false;
		 		  $scope.showResendInvitationStatusButton=false;
		 		  $scope.statusImagePath = '../public/assets/images/green_dot.png';
		 		  break;
		 case 0 : $scope.status = 'Deactivated';
		 		  $scope.showActiveStatusButton = true;
		 		  $scope.showDeactiveStatusButton = false;
		 		  $scope.showResendInvitationStatusButton=false;
		 		  $scope.statusImagePath = '../public/assets/images/gray_dot.png';
		 		  break;
		 }
	};
	
	$scope.getCustomerInformation = function(domainName) {
	
		 $.ajax({
				type : "GET",
				url : "http://localhost:9763/AnsurNGSaaS/fluke/admin/getTenant/"+domainName+"/",
				contentType : "application/json",
				async : false,
				dataType : "json",
				cache : false,
				success : function(result) {
					console.log(result);
					$scope.OrganizationName = result.orgName;
					$scope.userName = result.userName;
					$scope.Email = result.email;
					$scope.getCustomerStatus(result);		
					var currentTime = new Date(result.createdDate);
				    var day = currentTime.getDate();
					var month = currentTime.getMonth() + 1;
					var year = currentTime.getFullYear();
					  if (day < 10){
					  day = "0" + day;
					  }
					  if (month < 10){
					  month = "0" + month;
					  }
					var dateOut = day + "-" + month + "-" + year;					
					$scope.AddedOn = dateOut;
					$scope.ContactPersonName = result.contactPersonName;
					$scope.PhoneNo = result.phNumber;
					$scope.location = result.location;
					$scope.TaxID = result.taxID;
				},
				failure : function(result) {
					swal('Failed','Failed to load Customer Information\nPlease refresh the page','error');
				}
		 });
	};
	
	if($rootScope.selectedCustomer === undefined) {
		swal({
	 		 title: "Refresh Not Allowed",
	 		 text: "Application routed to Customer Accounts Page...!", 
	 		 type: "warning",	 		   		
	 		 confirmButtonColor: "#337ab7",
	 		 confirmButtonText: "ok",	 		  
	 		 }, function() {
	 			 $scope.$apply(function(){
	 				$location.path('/'); 
	 			 });	 			  
	 		});
	} else {
		var domainName = $rootScope.selectedCustomer.entity.tenantDomain;
		var userName = $rootScope.selectedCustomer.entity.userName;
		$scope.getCustomerInformation(domainName);  
	  // Deactivate
	    $scope.deactivateFromCustomerInfo = function() {  	
	 	 swal({
	 		 title: "Deactivate Customer?",
	 		 text: "Are you sure want to deactivate '"+userName+"' ?",
	 		 type: "warning",
	 		 showCancelButton: true,  		
	 		 confirmButtonColor: "#337ab7",
	 		 confirmButtonText: "Deactivate",
	 		 closeOnConfirm: false 
	 		 }, function() {
	 			$.ajax({
	  				type : "PUT",
		  			url : "http://localhost:9763/AnsurNGSaaS/fluke/admin/deactivateTenant/"+domainName+"/",
	  	  			contentType : "application/json; charset=UTF-8",
	  	  			async : false,
	  	  			dataType : "json",
	  	  			cache : false,
		  	  		success : function(result) {
		  	  			$scope.$apply(function(){
		  	  			$scope.getCustomerInformation(domainName);
		  	  			});		  	  		
		  	  			swal("Succes", "'"+userName+"' is successfully deactivated", "success");
		  	  		},
		  	  		failure : function(result) {
		  	  			swal("Failed", "'"+userName+"' is failed to deactivate", "error");
		  	  		}
	  			});	 			
	 		});
	  };
	  
	  // Activate
	  $scope.activateFromCustomerInfo = function() {  	
		 	 swal({
		 		 title: "Activate Customer?",
		 		 text: "Are you sure want to activate '"+userName+"' ?",
		 		 type: "warning",
		 		 showCancelButton: true,  		
		 		 confirmButtonColor: "#337ab7",
		 		 confirmButtonText: "Activate",
		 		 closeOnConfirm: false 
		 		 }, function() {
		 			$.ajax({
			  	  		type : "PUT",
			  	  		url : "http://localhost:9763/AnsurNGSaaS/fluke/admin/activateTenant/"+domainName+"/",
			  	  		contentType : "application/json",
			  	  		async : false,
			  	  		dataType : "json",
			  	  		cache : false,
			  	  		success : function(result) {
			  	  		$scope.$apply(function(){
			  	  			$scope.getCustomerInformation(domainName);
			  	  		});	
			  	  		swal("Succes", "'"+userName+"' is successfully activated", "success");
			  	  		},
			  	  		failure : function(result) {
			  	  			swal("Failed", "'"+userName+" is failed to fctivate", "error");
			  	  		}
		  			});
			 });
		};
		
		
		// "Resend Invitation"
	    $scope.sesendInvitationFromCustomerInfo = function() {  	
	 	 swal({
	 		 title: "Resend Invitation Customer?",
	 		 text: "Are you sure want to Resend Invitation to '"+userName+"' ?",
	 		 type: "warning",
	 		 showCancelButton: true,  		
	 		 confirmButtonColor: "#337ab7",
	 		 confirmButtonText: "Resend Invitation",
	 		 closeOnConfirm: false 
	 		 }, function() {
	 			$.ajax({
	  				type : "POST",
		  			url : "http://localhost:9763/AnsurNGSaaS/fluke/user/resendInvitationLink",
	  	  			contentType : "application/json; charset=UTF-8",
	  	  			async : false,
	  	  			dataType : "json",
	  	  			cache : false,
		  	  		success : function(result) {
		  	  			$scope.$apply(function(){
		  	  			$scope.getCustomerInformation(domainName);
		  	  			});		  	  		
		  	  			swal("Succes", "'"+userName+"' is successfully Resend Invitation", "success");
		  	  		},
		  	  		failure : function(result) {
		  	  			swal("Failed", "'"+userName+"' is failed to Resend Invitation", "error");
		  	  		}
	  			});	 			
	 		});
	  };
		
	  	  
	  $scope.addSubscription = function() {
	  	 $uibModal.open({
	      	animation: $scope.animationsEnabled,
	      	templateUrl: '../public/templates/modals/addSubscription.html',
	      	controller: 'addSubscriptionCtrl'     
	      });
	  };
	} // End of else   
}]);