angular.module('app')
  .directive('infiniteScroll', function() {
    return {
      restrict: 'AE',
      scope: {
        onInfinite: '&'
      },
      template: '<button ng-click="loadMore()" ng-disabled="noMore" class="btn" ng-if="!isLoading" ng-bind="showWord"></button>',
      link: function(scope, element, attr) {
        scope.isLoading = false;
        scope.noMore = false;
        scope.showWord = attr.loadMoreWord;

        scope.loadMore = function() {
          scope.isLoading = true;
          scope.onInfinite();
        };

        scope.$on('scroll.infiniteScrollComplete', function(e, noMore) {
          scope.isLoading = false;
          if (noMore) {
            scope.showWord = attr.noMoreWord;
            scope.noMore = true;
          }
        });
      }
    };
  });
