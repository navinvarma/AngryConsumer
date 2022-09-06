var consumerComplaintsApp = angular.module('consumerComplaintsApp', ['ngRoute','ui.bootstrap']);
consumerComplaintsApp.controller('consumerComplaintsController', function ($scope, $http){
	// When fetching one company's complaint list
	$scope.fetchCompany = function(){
		var pageToGet = $scope.currentPage;
		if(pageToGet == "" || pageToGet == null || angular.isUndefined(pageToGet)){
			pageToGet = 1;
		}
		$scope.currentPage = pageToGet;
		var pageSizeToGet = $scope.pageSize;
		if(pageSizeToGet == "" || pageSizeToGet == null || angular.isUndefined(pageSizeToGet)){
			pageSizeToGet = 10;
		}
		$scope.pageSize = pageSizeToGet;
		var companyNameToGet = $scope.companyName;
		if(companyNameToGet == "" || companyNameToGet == null || angular.isUndefined(companyNameToGet)){
			companyNameToGet = "";
		}
		var timelyResponseToGet = $scope.timelyResponse;
		if(timelyResponseToGet == "" || timelyResponseToGet == null || angular.isUndefined(timelyResponseToGet)){
			timelyResponseToGet = "";
		}
		var consumerDisputedToGet = $scope.consumerDisputed;
		if(consumerDisputedToGet == "" || consumerDisputedToGet == null || angular.isUndefined(consumerDisputedToGet)){
			consumerDisputedToGet = "";
		}
		$http.get('complaints?page='+pageToGet+'&pageSize='+pageSizeToGet+'&companyName='+companyNameToGet+'&timelyResponse='+timelyResponseToGet+'&consumerDisputed='+consumerDisputedToGet).success(function(data) {
			$scope.complaints = data;
		});
		// Count of total records
		$http.get('complaints/count?companyName='+companyNameToGet+'&timelyResponse='+timelyResponseToGet+'&consumerDisputed='+consumerDisputedToGet).success(function(data) {
			$scope.count = data.count;
			$scope.totalPages = Math.ceil(data.count/pageSizeToGet);
		});	
	};
	$scope.fetchCompany();		
	// Events for pagination
	$scope.firstPage = function() {
		 $scope.currentPage = 1;
		 $scope.fetchCompany();
	}				
	$scope.nextPage = function() {
		 $scope.currentPage++;
		 $scope.fetchCompany();
	}
	$scope.prevPage = function() {
		 $scope.currentPage--;
		 $scope.fetchCompany();
	}
	$scope.lastPage = function() {
		$scope.currentPage = $scope.totalPages;
		 $scope.fetchCompany();
	}
	$scope.filterChanged = function() {
		 $scope.currentPage = 1;
		 $scope.fetchCompany();
	}
	// Load company list 
	$http.get('complaints/companies/list').success(function (data) {
		$scope.companies = data;
	});
	$scope.isActive = function (viewLocation) { 
        return viewLocation === document.location.path;
    };	
});