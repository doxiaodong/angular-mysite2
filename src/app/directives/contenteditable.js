'use strict';

angular.module('app')
  .directive('contenteditable', function() {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, element, attr, ngModel) {
        if(!ngModel) return; // do nothing if no ng-model

        // Specify how UI should be updated
        ngModel.$render = function() {
          element.html(ngModel.$viewValue || '');
        };

        // Listen for change events to enable binding
        element.on('keydown', function(e) {
          if (e.keyCode === 9) {
            e.preventDefault();

            //var range = window.getSelection().getRangeAt(0);
            //var startPos = range.startOffset;
            //var endPos = range.endOffset;
            //var text = element.html();
            //console.log(text);
            //element.html(text.substring(0, startPos) + '  ' + text.slice(endPos));
            //console.log(range);
          }
        });
        element.on('blur keyup change', function(e) {
          if (e.type === 'keyup' && e.keyCode === 13) {
            scope.$eval(attr.submit);
            return;
          }
          scope.$apply(read);
        });
        read(); // initialize

        // Write data to the model
        function read() {
          var html = element.html();
          // When we clear the content editable the browser leaves a <br> behind
          // If strip-br attribute is provided then we strip this out
          if( attr.stripBr && html === '<br>' ) {
            html = '';
          }
          ngModel.$setViewValue(html);
        }
      }
    };
  });
