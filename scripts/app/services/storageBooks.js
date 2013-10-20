/**
 * Store books in localStorage
 * Encodes data because otherwise AngularJS freaks out with charachters like "ò"
 * Gets default books from the server if localStorage is empty
 */
define([
    '../app'
], function(
    app
) {

    app.factory('storageBooks', ['$http', '$q', function( $http, $q ) {
        var STORAGE_ID    = 'bookstore-books'
          , DEFAULT_BOOKS = './default-books.json';

        function get( callback ) {
            var inStorage = JSON.parse( localStorage.getItem(STORAGE_ID) );

            // since it's just a prototype, why not to load default books
            // everytime you remove the whole collection?
            if ( inStorage && inStorage.length > 0 ) {
                callback( null, inStorage );
            } else {
                getDefault( callback );
            }
        }

        function put( books ) {
            var items = JSON.stringify( books );
            return localStorage.setItem( STORAGE_ID, items );
        }


        function getDefault( callback ) {
            $http.get( DEFAULT_BOOKS )
            .success(function( data ) {
                callback( null, data );
            });
        }


        return {
            get: get
          , put: put
        };
    }]);
});