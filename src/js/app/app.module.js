angular.module("app", ["templates", "app.directive", "data.service"])
    .controller('itemsCtrl', ['$scope','utils',  function ($scope, utils) {
        $scope.list = utils.makeDefaultData();
        $scope.currentItem = {};
        $scope.history = [];

        // $scope.lastItem = {};
        $scope.tags = new Set();

        $scope.list.forEach(i => {
            if(!$scope.lastItem) $scope.lastItem = i;
            if($scope.lastItem.date <= i.date) $scope.lastItem = i;
            i.tags.forEach(tag => $scope.tags.add(tag))
        });

        $scope.addItem = function (itemName) {
            const date = new Date().toISOString();
            const newItem = {
                id: utils.makeDataId(),
                title: itemName,
                tags: [],
                date
            }
            if(date>=$scope.lastItem.date) $scope.lastItem = newItem;
            $scope.list.push(newItem);
        }

        $scope.setCurrent = function (itemId) {
            if(itemId === $scope.currentItem.id) {
                const len = $scope.history.length;
                $scope.history[len-1] += ', ' + $scope.currentItem.title;
            } else {
                $scope.currentItem = $scope.list.filter(i => i.id === itemId)[0];
                $scope.history.push($scope.currentItem.title);
            }
        }

        $scope.addTag = function (tagName) {
            if (!tagName.length) return;
            $scope.tags.add(tagName);

            if($scope.currentItem.tags.indexOf(tagName)<0) $scope.currentItem.tags.push(tagName)
        }

        $scope.removeTag = function (tagName) {
            $scope.currentItem.tags = $scope.currentItem.tags.filter(i => i !== tagName);
        }

    }])
