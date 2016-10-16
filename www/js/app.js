angular.module('itemAdmin', ['ionic'])

.controller("itemController", function($scope, $http, $location, $ionicModal) {

	$scope.item = {};

	$http.get('http://localhost:8090/items').then(function(response) {
		$scope.items = response.data._embedded.items;
	})

	$scope.createItem = function(item) {
		var dataObject = {
			name : item.name,
			code : item.code
		};

    var cmd = item.cmd;
    if (cmd == "edit") {
      var url = item._links.self.href;
      $http.put(url, dataObject);
    } else {
      var url = "http://localhost:8090/items";
      $http.post(url, dataObject);
    }

    $scope.taskModal.hide();
    item.name = "";
    item.code = "";
	};

	$scope.deleteItem = function(url) {
		$http.delete(url);
	}

  // Create our modal
  $ionicModal.fromTemplateUrl('new-item.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.newItem = function() {
    $scope.item.name = "";
    $scope.item.code = "";
    $scope.taskModal.show();
  }

  $scope.closeNewItem = function() {
    $scope.taskModal.hide();
  }

  $scope.editItem = function(item) {
    $scope.item.name = item.name;
    $scope.item.code = item.code;
    $scope.item.cmd = "edit";
    $scope.taskModal.show();
  }

});
