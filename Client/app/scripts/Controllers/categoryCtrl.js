/**
 * Created by bryan on 8/16/14.
 */
'use strict';

app.controller('categoryCtrl', ['$scope', '$modal', 'CategoryService', function ($scope, $modal, CategoryService) {
	CategoryService.getList().then(function(categories) {
		$scope.categories = categories;
	});

	$scope.openDialog = function (category) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/categories/add.html',
			controller: ModalInstanceCtrl,
			resolve: {
				category: function () {
					return category;
				}
			}
		});

		modalInstance.result.then(function (response) {
			response.isNew && $scope.add(response.category);
		}, function () {
			console.info('Modal dismissed at: ' + new Date());
		});

		function ModalInstanceCtrl($scope, $modalInstance, category) {
			var isNew = category ? false : true;

			$scope.actionName = isNew ? 'Add' : 'Edit';
			$scope.category = category || { title: '', description: '' };

			$scope.save = function () {
				CategoryService.post(category).then(function () {
					$modalInstance.close({
						category: $scope.category,
						isNew: isNew
					});
				});
			};

			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
		}
	};

	$scope.add = function (category) {
		$scope.categories.push(category);
	}
}]);