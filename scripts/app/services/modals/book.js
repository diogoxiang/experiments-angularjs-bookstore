/**
 * Modal manager for books
 *
 * Usage: modalBook.show( 'add', $scope );
 *        modalBook.show( 'edit', $scope, id );
 *        modalBook.hide();
 */
define([
    '../../app'

  , '../errors'
], function(
    app
) {
    app.factory('modal.book', ['errors', function( errors ) {
        var TEXTS   = {
                add : 'Add a book'
              , edit: 'Edit book'
            }
          , methods = {
                show: {}
              , hide: {}
            }
          , $modal       // jQuery el with modal window
          , form;        // form HTML el in $modal


        /**
         * We load the template dynamically,
         * so we need to find HTML-elements
         */
        function updateVars() {
            $modal  = $( '#modal-book' );
            form    = $modal.find( 'form:eq(0)' )[ 0 ];
        }

        methods.show.add = function( $scope, type ) {
            setText( $scope, type );
            delete $scope.modalBook;
            form.reset();
            $modal.modal();
        }

        methods.show.edit = function( $scope, type, id ) {
            setText( $scope, type );

            for ( var i = 0, lng = $scope.books.length; i < lng; i++ ) {
                var book = $scope.books[ i ];
                if ( book.id === id ) {
                    $scope.modalBook = angular.copy( book );
                    $modal.modal();
                    return;
                }
            }
        }


        function show( type, $scope, id ) {
            caller( $scope, 'show', type, id );
        }

        function hide( type, $scope ) {
            updateVars();
            $modal.modal( 'hide' );
        }

        function setText( $scope, type ) {
            $scope.modalBookTextTitle      = TEXTS[ type ];
            $scope.modalBookTextSaveButton = TEXTS[ type ];
        }

        function caller( $scope, method, type, id ) {
            updateVars();

            try {
                methods[ method ][ type ]( $scope, type, id );
            } catch( e ) {
                errors.handle( 'No such method as "' + type + '" in a modal service!' );
            }
        }


        return {
            show: show
          , hide: hide
        };
    }]);
});