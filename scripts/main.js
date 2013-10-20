// should have used JamJS...
require.config({
    paths: {
        jquery           : 'vendor/jquery/jquery'
      , angular          : 'vendor/angular-unstable/angular'
      , pnotify          : 'vendor/pnotify/jquery.pnotify'
      , bootstrap        : 'vendor/bootstrap/dist/js/bootstrap'
      , 'bootstrap-modal': 'vendor/bootstrap-modal/js/bootstrap-modal'
      , 'bootstrap-modalmanager': 'vendor/bootstrap-modal/js/bootstrap-modalmanager'
      , 'json-schema-validate'  : 'vendor/json-schema/lib/validate'
      , 'jquery-schema-validate'  : 'vendor/json-schema/lib/validate'
    }
  , shim: {
        bootstrap: {
            deps: [ 'jquery' ]
        }
      , 'bootstrap-modalmanager': {
            deps: [
              'bootstrap'
            ]
        }
      , 'bootstrap-modal': {
            deps: [
              'bootstrap-modalmanager'
            ]
        }
      , pnotify: {
            deps: [ 'bootstrap' ]
        }
      , angular: {
            exports: 'angular'
        }
    }
});


require([
    'angular'

  , './app/controllers/bookstore'
  , './app/controllers/ponies'

  , './app/directives/book-price'

  , './app/filters/price'

  , 'bootstrap'
  , 'bootstrap-modal'
], function(
    angular
) {

    // do not use ng-app directive, because JS may not be loaded
    // by RequireJS by the time Angular will try to process it
    angular.bootstrap( document, [ 'bookstore' ] );

});