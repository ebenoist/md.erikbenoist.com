var App = angular.module('App', ["ngSanitize", "ui.codemirror"]);

App.controller('Controller', function($scope) {
  $scope.options = {
    lineNumbers: false,
    mode: 'markdown',
  }
});


App.directive("markdown", function() {
  return {
    scope: {
      model: "=ngModel"
    },
    link: function(scope, elem, attrs) {
      scope.$watch("model", function(newValue, oldValue) {
        if (!newValue) return;
        var html, converter;
        converter = new Showdown.converter();
        html = converter.makeHtml(newValue);
        elem.html(html);
      });
    }
  }
});

// fun but not needed
// App.directive('contenteditable', function($sce) {
  // return {
    // restrict: 'A', // only activate on element attribute
    // require: '?ngModel', // get a hold of NgModelController
    // link: function(scope, element, attrs, ngModel) {
      // if(!ngModel) return; // do nothing if no ng-model

      // Specify how UI should be updated
      // ngModel.$render = function() {
        // element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      // };

      // Listen for change events to enable binding
      // element.on('blur keyup change', function() {
        // scope.$apply(read);
      // });
      // read(); // initialize

      // Write data to the model
      // function read() {
        // var newHtml, html, clean, converter;
        // converter = new Showdown.converter();
        // html = element.html();

        // clean = html.replace(/&lt;/g, "<");
        // clean = clean.replace(/&gt;/g, ">");
        // clean = clean.replace(/<br>/g, "\n");
        // clean = clean.replace(/<div>/g, "\n");
        // clean = clean.replace(/<\/div>/g, "");
        // console.log(clean);

        // ngModel.$setViewValue(converter.makeHtml(clean));
      // }
    // }
  // }
// });
