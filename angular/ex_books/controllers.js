'use strict';

bookApp.controller('BookListCtrl', function($scope, $http) {

	$http.get('data/books.json').success(function(data) {
		$scope.books = data;
	});
	
	$scope.myOrderProperty = 'price';
	
});