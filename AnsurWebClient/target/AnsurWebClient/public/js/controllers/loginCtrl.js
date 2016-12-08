////////////////////////////////////////////////////////////////
// Description : Login Controller - User Authentication, Form Validations, Cookie Management
// Author :Chintham VeeraReddy on 09-06-2016
// Modified By : None
// Version : 0.0.1
///////////////////////////////////////////////////////////////
var loginApp = angular.module('loginApp',['ui.bootstrap','ngAnimate']);

// Login Controller
loginApp.controller('loginCtrl',['$scope','$http','$uibModal', '$location',
function($scope,$http,$uibModal,$location) {	 	
	var username = localStorage.getItem('username');
	var region = localStorage.getItem('region');
	if(username !== null && region !== null) {
		$scope.region = region;
		$scope.username = username;
		$scope.rememberMe = true;
	} else {		
		$scope.rememberMe = false;
	}
	

	function generateUUID() {
	    var d = new Date().getTime();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    return uuid;
	};

	
	// This method is invoked on submission of login form
	$scope.submitLoginForm = function(isValid) {	  
  	if(isValid) {
		var data = {
				userName : $scope.username,
				password : $scope.password,
				clientUUID:generateUUID()
				
				
		};
		var URL = 'http://localhost:9763/AnsurNGSaaS/fluke/admin/login';
		
		var res = $http.post(URL, data);
		res.success(function(response, status, headers, config) {
			if($scope.rememberMe) {
				localStorage.setItem('username',$scope.username);
	  			localStorage.setItem('region',$scope.region);
	  		} else {  			
	  			localStorage.clear();
	  			localStorage.setItem('username',$scope.username);
	  		}
			var homePageURL = window.location.href+'views/home.html';
			location.href = homePageURL;		
			
		});
		res.error(function(response, status, headers, config) {			
			swal({ 
			  title: 'Invalid Credentials',
			  text: 'Please enter valid Username and Password',
			  type: 'error' 
			 },
			 function(){
				 var currentURL = window.location.href;
				   var indexOfAnsurWebClient = currentURL.indexOf('AnsurWebClient');
				   var logoutURL = currentURL.substring(0,indexOfAnsurWebClient+14)+'/';
			       location.href = logoutURL ;
			 });
		});
				
	  } // End of isValid()
	}; // End of submitLoginForm();	
	
	// This method opens the Forgot Password Modal
	$scope.animationsEnabled = true;
	$scope.openForgotPassword = function (size) {
	  return $uibModal.open( {
		animation: $scope.animationsEnabled,
		templateUrl: 'public/templates/modals/forgotPassword.html',
		controller: 'forgotPasswordCtrl',		
		size : size	
	  });
	}; // End of openForgotPassword()
}]); // End of loginCtrl