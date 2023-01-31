angular.module("app.directive", [])
    .directive("app", () => {
        return {
            scope: {
                lastItem: "=",
                list: "=",
                setCurrent: "&",
                addItem: "&",
                currentItem: "=",
                tags: "=",
                addTag: "&",
                removeTag: "&",
                history: "="
            },
            restrict: "E",
            templateUrl: "./js/app/templates/app.tpl.html",
        };
    })
    .directive("contentView", () => {
        return {
            scope: {
                lastItem: "=",
                list: "=",
                setCurrent: "&",
                addItem: "&",
                tags: "=",
            },
            restrict: "E",
            templateUrl: "./js/app/templates/content-view.tpl.html",
        };
    })
    .directive("some1", () => {
        return {
            scope: {
                lastItem: "=",
                tags: "=",
            },
            restrict: "E",
            template: "<some-2 last-item='lastItem' tags='tags'></some-2>",
        };
    })
    .directive("some2", () => {
        return {
            scope: {
                lastItem: "=",
                tags: "=",
            },
            restrict: "E",
            template: "<some-3 last-item='lastItem' tags='tags'></some-3>",
        };
    })
    .directive("some3", () => {
        return {
            scope: {
                lastItem: "=",
                tags: "=",
            },
            restrict: "E",
            template: "<summary-view last-item='lastItem' tags='tags'></summary-view>",
        };
    })
    .directive("summaryView", () => {
        return {
            scope: {
                lastItem: "=",
                tags: "=",
            },
            restrict: "E",
            templateUrl: "./js/app/templates/summary-view.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.tagListStr = Array.from($scope.tags).toString();
            }]
        };
    })
    .directive("itemsContainer", () => {
        return {
            scope: {
                list: "=",
                setCurrent: "&",
                addItem: "&",
            },
            restrict: "E",
            templateUrl: "./js/filter/templates/items-container.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.selectOptions = ["title", "date"];
                $scope.selectValue = "title";
                $scope.isOnlyDate = false;
                $scope.inputSearch = '';

                $scope.sortBy = function (param) {
                    $scope.list.sort((a,b)=>{
                        if(a[param]<b[param]) return -1;
                        if(a[param]>b[param]) return 1;
                        return 0;
                    })
                }

            }]
        };
    })

    .directive("itemsView", () => {
        return {
            scope: {
                list: "=",
                isOnlyDate: "=",
                inputSearch: "=",
                setCurrent: "&",
                getDate: "&",
                selectValue: "="
            },
            restrict: "E",
            templateUrl: "./js/filter/templates/items-view.tpl.html",
        };
    })
    .directive("createItemView", () => {
        return {
            scope: {
                addItem: "&"
            },
            restrict: "E",
            templateUrl: "./js/filter/templates/create-item-view.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.title = "";

                $scope.onSubmitHandler = function (title) {
                    $scope.addItem({itemName: title})
                    $scope.title = "";
                }
            }]
        };
    })
    .directive("controlView", () => {
        return {
            scope: {
                selectOptions: "=",
                selectValue: "=",
                isOnlyDate: "=",
                inputSearch: "=",
            },
            restrict: "E",
            templateUrl: "./js/filter/templates/control-view.tpl.html",
        };
    })
    .directive("itemRow", () => {
        return {
            scope: {
                title: "=",
                date: "=",
                isOnlyDate: "=",
                inputSearch: "=",
                getDate:"&",
                setCurrent: "&",
                item: "="
            },
            restrict: "E",
            templateUrl: "./js/filter/templates/item-row.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.getDate = function (date) {
                    let toStringMethod = 'toLocaleString';
                    if($scope.isOnlyDate) toStringMethod = 'toLocaleDateString';

                    return new Date(date.slice(0, -1))[toStringMethod]()
                }
                $scope.onClickItem = function (item) {
                    $scope.setCurrent(item);
                }
            }],
        };
    })

    .directive("elementsView", () => {
        return {
            scope: {
                history: "="
            },
            restrict: "E",
            templateUrl: "./js/app/templates/elements-view.tpl.html",
            controller: ["$scope", "$element", elementsViewCtrl],
        };
        function elementsViewCtrl($scope, $element) {
            $scope.model = {
                width: 300,
            };
            $scope.setWidth = () => {
                let width = $scope.model.width;
                if (!width) {
                    width = 1;
                    $scope.model.width = width;
                }
                $element.css("width", `${width}px`);
            };
            $scope.setWidth();
        }
    })
    .directive("sidebarView", () => {
        return {
            scope: {
                currentItem: "=",
                addTag: "&",
                removeTag: "&",
            },
            restrict: "E",
            templateUrl: "./js/app/templates/sidebar-view.tpl.html",
        };
    })
    .directive("tagItem", () => {
        return {
            scope: {
                tag: "=",
                currentItem: "=",
                removeTag: "&",
            },
            restrict: "E",
            templateUrl: "./js/tags/tag-item.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.onClickItem = function (tag) {
                    $scope.removeTag({tagName:tag});
                }
            }],
        };
    })
    .directive("tagCreate", () => {
        return {
            scope: {
                addTag: "&"
            },
            restrict: "E",
            templateUrl: "./js/tags/tag-create.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.inputTag = "";
                $scope.onClickHandler = function (tag) {
                    $scope.inputTag = "";
                    $scope.addTag({tagName:tag});
                }
            }],
        };
    })
    .directive("historyView", () => {
        return {
            scope: {
                history: "="
            },
            restrict: "E",
            templateUrl: "./js/history/history-view.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.onClickHandler = function () {
                    $scope.history = [];
                }
            }],
        };
    })
    .directive("historyItem", () => {
        return {
            scope: {
                item: "="
            },
            restrict: "E",
            templateUrl: "./js/history/history-item.tpl.html",
            controller: ["$scope", function ($scope) {
                $scope.showControl = false;
            }]
        };
    })



/**

 .directive("some1", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<some-2></some-2>",
    };
  })
 .directive("some2", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<some-3></some-3>",
    };
  })
 .directive("some3", () => {
    return {
      scope: {},
      restrict: "E",
      template: "<summary-view></summary-view>",
    };
  })
 .directive("summaryView", () => {
    return {
      scope: {},
      restrict: "E",
      templateUrl: "./js/app/summary-view.tpl.html",
    };
  });


* */
