/**
 * Remove dialog
 *
 * Usage: modalRemove.show( $scope, id );
 *        modalRemove.hide();
 */
define([
    '../../app'
], function(
    app
) {
    app.factory('modal.remove', function() {
        var $modal;      // jQuery el with modal window


        /**
         * We load the template dynamically,
         * so we need to find HTML-elements
         */
        function updateVars() {
            $modal  = $( '#modal-remove' );
        }

        function show( $scope, book ) {
            updateVars();
            $scope.bookToRemove = angular.copy( book );
            $modal.modal();
        }

        function hide( type, $scope ) {
            updateVars();
            $modal.modal( 'hide' );
        }


        return {
            show: show
          , hide: hide
        };
    });
});