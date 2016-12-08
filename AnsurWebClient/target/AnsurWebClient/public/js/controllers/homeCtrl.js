////////////////////////////////////////////////////////////////
// Description : Home Page Controller - User Activities
// Author : Chintham VeeraReddy on 10-06-2016
// Modified By : None
// Version : 0.0.1
///////////////////////////////////////////////////////////////
var homeApp = angular.module('homeApp', ['ngRoute','ui.bootstrap','ui.grid']);
// Routing
homeApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : '../public/templates/routes/customerAccounts.html',
    controller  : 'homeCtrl',
    controllerAs : 'vm'
  })
  .when('/customerInfo', {
    templateUrl : '../public/templates/routes/customerInfo.html',
    controller  : 'customerInfoCtrl'    
  });
});

homeApp.controller('homeCtrl',['$scope','$uibModal','$http','$location', '$rootScope', 
function($scope, $uibModal, $http, $location, $rootScope, uiGridConstants) {  
 $scope.animationsEnabled = true;
 var vm = this; 
 $scope.filteredData = [];
 $scope.showDeactivated = false;
 var cellInfoTemplate = '<div class="gridColTextCenter"><div ng-show="true" style="text-align:center;" class="ngCellText">'+
   '<div id="cellTemplateContentStyle" ng-if="grid.getCellValue(row, col) === \'Invitation sent\'">'+
   '<img id ="invtitationsent" src="../public/assets/images/import_BG_1x.png">'+
   '<div id="invitationtext">Invitation sent</div></div>'+ 
   '<div id="cellTemplateContentStyle" ng-if="grid.getCellValue(row, col) === \'Active\'">'+
   '<img id ="active" src="../public/assets/images/green_dot.png">'+
   '<div id="activetext">Active</div></div>'+
   '<div id="cellTemplateContentStyle" ng-if="grid.getCellValue(row, col) == \'Deactivated\'">'+
   '<img id ="deactive" src="../public/assets/images/gray_dot.png">'+
   '<div id="deactivetext">Deactivated</div></div>'+
   '</div></div>';
 var tooltipCellTemplate = '<div class="ui-grid-cell-contents" title="{{COL_FIELD}}">'+
	 '{{COL_FIELD}}'+
	 '</div>';

 $scope.gridOptions = {
		     enableFiltering: true,
			 enableHorizontalScrollbar : 2, // 0- Never, 1- Always, 2-When Needed
			 //enableVerticalScrollbar : true,
			 enableSorting : false,
			enableColumnMenus : false,
			rowHeight:60,
			columnDefs: [
			 { field : 'orgName',
			   name : 'Organization Name',
			   height : '100%',		
			   cellClass : 'noborder',
			   cellTemplate : tooltipCellTemplate
			 },
		   { field: 'userName',
			   name : 'Customer Name',		
			   cellClass: 'noborder',
			   cellTemplate : tooltipCellTemplate
			 },
			 { field: 'tenantDomain',
			   name : 'Domain',					   
			   cellClass: 'noborder',
			   cellTemplate : tooltipCellTemplate
					 },
			 { field : 'status',
				name : 'Status',		
				cellTemplate: cellInfoTemplate,
				cellClass: 'noborder'				
			  },
			  {  field: 'createdDate', displayName: ' Created Date', type: 'date', cellFilter: 'date:\'dd-MM-yyyy\'',
				  name : 'Created Date'				 
			  },
			  { field: 'Info', 
				  Name: 'Info',		                                                    
				  enableFiltering: false,
				  name:'',			
				  cellTemplate:'../public/templates/gridDropDown.html',
				  cellClass: 'noborder'}			
			],
			   onRegisterApi : function (gridApi) {				
				$scope.gridApiCustomerAccounts = gridApi;				
			},
 			data : []
		}; 
      $scope.username = localStorage.getItem('username');
      $scope.updateUIGrid = function (data) {
      $scope.gridOptions.data = data; 
      $scope.gridApiCustomerAccounts.core.refresh();
   };
 
 $scope.showActiveInvitationSent = function(usersData, checked) {
	 if(checked) {	
	   return usersData;
	 } else {
		for(var i=0;i<usersData.length;i++) {
		  if(usersData[i].status !== 'Deactivated') {
			$scope.filteredData.push(usersData[i]); 
		  } 	   
		}
		return $scope.filteredData;		 
	 }	 	 
 }; 
 
 
 $rootScope.getCustomerAccountsData = function(refreshStatus) {
	 $.ajax({
			type : "GET",
			crossDomain:true,
			url : "http://localhost:9763/AnsurNGSaaS/fluke/admin/getTenantsList",
			contentType : "application/json",
			async : false,
			dataType : "json",
			traditional: true,
			success : function(data) {
				$scope.filteredData = [];
				for(var i=0;i<data.length;i++){
					switch(data[i].status){
						case 0 : data[i].status = 'Deactivated'; 
								 break;
						case 1 : data[i].status = 'Active'; 
							     break;
						case 2 : data[i].status = 'Invitation sent'; 
								 break;
					}
				}
				if(refreshStatus) {
					$scope.updateUIGrid($scope.showActiveInvitationSent(data,refreshStatus));
				} else {
					$scope.updateUIGrid($scope.showActiveInvitationSent(data,refreshStatus));
				}				
			},
			error : function(data) {
				swal('Failed','Failed to load Customer Accounts Data\nPlease refresh the page','error');
			}
		}); 
 };
 
 
 $rootScope.getCustomerAccountsData(false); 
 
 $scope.CustomergridOptions = {
     enableHorizontalScrollbar : true,
     enableVerticalScrollbar : 0,
     enableSorting : false,
     enableColumnMenus : false,	 
	 rowHeight:50,	
	   columnDefs: [
	     { field: 'DeviceType',
	    	 name : 'Device Type',
		     cellClass: 'noborder'
	     },
	     { field: 'ModelNumber',
	    	 name : 'Model Number',
		     cellClass: 'noborder'
	     },
	     { field: 'SerialNumber',
	    	 name : 'Serial Number',
		     cellClass: 'noborder'
	     },
	     { field: 'LicenseKey',
	    	 name : 'License Key',
	       cellClass: 'noborder'
	     },		  
	     { field: 'TimePeriod',
	    	 name : 'Time Period',	    	 
		     cellClass: 'noborder'
		   }],
	   data:[
	     { 'DeviceType':"AAA",
	       'ModelNumber': "AAA11",
	       'SerialNumber': 'AAA110001',
	       'LicenseKey':'AAA110101-ABA110101-ACA110101',
	       'TimePeriod':'1'
	     },
	     { 'DeviceType':"BBB",
	    	 'ModelNumber':"BBB22",			
	    	 'SerialNumber': 'BBB220002',
	    	 'LicenseKey':'BAB110101-BBB110101-BCB110101',
	    	 'TimePeriod':'2'
	     },
		   
	     { 'DeviceType':"DDD",
	    	 'ModelNumber':"DDD33",			
	    	 'SerialNumber': 'DDD330003',
	    	 'LicenseKey':'DAD110101-DBD110101-DCD110101',
	    	 'TimePeriod':'1'
	     },			   
	     { 'DeviceType':"CCC",
	    	 'ModelNumber':"CCC44",			
	    	 'SerialNumber': 'CCC440004',
	    	 'LicenseKey':'CAC110101-CBC110101-CCC110101',
	    	 'TimePeriod':'2'
	     }]
   };
   
   vm.viewCustomerInfo = function(row) {
  	 $rootScope.selectedCustomer = row;  
     $location.path('/customerInfo');     
   };
   
   $scope.goBackToCustomerInfo = function() {
     $location.path('/');
   };
   
   vm.openActivateCustomer = function(row) {
	 var domainName = row.entity.tenantDomain;
	 swal({
  		 title: "Activate Customer?",
  		 text: "Are you sure want to activate '"+row.entity.userName+"' ?",
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
	  	  		$rootScope.getCustomerAccountsData($scope.showDeactivated);
	  	  		  swal("Succes", "'"+row.entity.userName+"' is successfully activated", "success");
	  	  		},
	  	  		failure : function(result) {
	  	  			swal("Failed", "'"+row.entity.userName+"' is failed to activate", "error");
	  	  		}
  			});
  		});
   };
      
   vm.openDeactivateCustomer = function(row) {	   
	 var domainName = row.entity.tenantDomain;	 
  	 swal({
  		 title: "Deactivate Customer?",
  		 text: "Are you sure want to deactivate '"+row.entity.userName+"' ?",
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
	  	  		$rootScope.getCustomerAccountsData($scope.showDeactivated);
	  	  		  swal("Succes", "'"+row.entity.userName+"' is successfully deactivated", "success");
	  	  		},
	  	  		failure : function(result) {
	  	  			swal("Failed", "'"+row.entity.userName+"' is failed to deactivate", "error");
	  	  		}
  			});
  		});
   };     
 
   vm.openDeleteCustomer = function(row) {	 
	 var customerName =  row.entity.tenantDomain;
  	 swal({
  		 title: "Delete Customer?",
  		 text: "Are you sure want to delete '"+row.entity.userName+"' ?",
  		 type: "warning",
  		 showCancelButton: true,  		
  		 confirmButtonColor: "#337ab7",
  		 confirmButtonText: "Delete",
  		 closeOnConfirm: false 
  		 }, function() {  			 
  			$.ajax({
  				type : "PUT",
	  	  			url : "http://localhost:9763/AnsurNGSaaS/fluke/admin/deleteTenant/"+customerName+"/",	  	  		          
	  	  			contentType : "application/json; charset=UTF-8",
	  	  			async : false,
	  	  			dataType : "json",
	  	  			cache : false,
	  	  		success : function(result) {
	  	  			console.log("result", result);
	  	  		$rootScope.getCustomerAccountsData($scope.showDeactivated);
	  	  		 swal("Succes", "'"+row.entity.userName+"' is successfully deleted", "success");
	  	  		},
	  	  		failure : function(result) {
	  	  		console.log("failure", result);
	  	  			swal("Failed", "'"+row.entity.userName+"' is failed to delete", "error");
	  	  		}
  			});
  		});
   }; 
   
   //Resend Invitation
   vm.openResendInvitationCustomer = function(row) {		 
		 var customerName =  row.entity.tenantDomain;
	  	 swal({
	  		 title: "Resend Invitation?",
	  		 text: "Are you sure want to Resend Invitation to'"+row.entity.userName+"' ?",
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
		  	  			console.log("result", result);
		  	  		$rootScope.getCustomerAccountsData($scope.showDeactivated);
		  	  		 swal("Succes", "'"+row.entity.userName+"' is successfully Resend Invitation", "success");
		  	  		},
		  	  		failure : function(result) {
		  	  		console.log("failure", result);
		  	  			swal("Failed", "'"+row.entity.userName+"' is failed to Resend Invitation", "error");
		  	  		}
	  			});
	  		});
	   };    
   
   // User Profile
   $scope.openUserProfile = function() {
     return $uibModal.open({
       animation: $scope.animationsEnabled,
       templateUrl: '../public/templates/modals/userProfile.html',
       controller: 'userProfileCtrl'
     });
   };
   
   // Change Password
   $scope.openChangePassword = function(row) {  	
     $uibModal.open({
     	animation: $scope.animationsEnabled,
     	templateUrl: '../public/templates/modals/changePassword.html',
     	controller: 'changePasswordCtrl',
     	directive: 'compareTo'
     });
   }; 
     
	  
   // Logout
   $scope.logout = function() {
	   var currentURL = window.location.href;
	   var indexOfAnsurWebClient = currentURL.indexOf('AnsurWebClient');
	   var logoutURL = currentURL.substring(0,indexOfAnsurWebClient+14)+'/';
       location.href = logoutURL ;
   };
  
   // Add Customer
   $scope.openAddCustomer = function (size) {
    return $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '../public/templates/modals/addCustomer.html',
      controller: 'addCustomerCtrl',		
      size : size,
      resolve: {
          showDeactivated: function () {
            return $scope.showDeactivated;
          }
        }
    });
   };
   
   // show deactivate customers filter
   $scope.showDeactivatedCustomers = function() {	   
	   if($scope.showDeactivated) {
		   $rootScope.getCustomerAccountsData($scope.showDeactivated); 
	   } else {
		   $rootScope.getCustomerAccountsData($scope.showDeactivated);
	   }		
   };

}]); 