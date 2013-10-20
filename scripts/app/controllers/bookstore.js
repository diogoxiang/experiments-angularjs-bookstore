/**
 * Main app controller
 */
define([
    '../app'
  , 'json-schema-validate'
  , '../json-schema/books'

  , '../services/storageBooks'
  , '../services/modals/main'
  , '../services/uuid'
  , '../services/errors'
], function(
    app
  , jsonSchemaValidate
  , jsonSchemaBooks
) {
    var NO_COVER_IMG = './styles/images/covers/goodreads.jpg';


    return app.controller('bookstoreController', [
        '$scope', 'storageBooks', 'modal.book', 'modal.remove', 'uuid', 'errors'
      , function( $scope, storageBooks, modalBook, modalRemove, uuid, errors ) {


            var books = $scope.books;


            // if books are not in the localStore
            // load them asynchronously
            storageBooks.get(function( error, loadedBooks ) {
                $scope.books = loadedBooks;

                // Backbone does this automatically :(
                $scope.$watch('books', function() {
                    var validationResult = jsonSchemaValidate( $scope.books, jsonSchemaBooks );

                    // ignore things we don't want
                    if ( validationResult.valid ) {
                        storageBooks.put( $scope.books );
                    } else {
                        errors.handle( 'Invalid data: ' + JSON.stringify($scope.books) );
                    }
                }, true);
            });



            $scope.addBookModal = function() {
                modalBook.show( 'add', $scope );
            }

            $scope.editBookModal = function( id ) {
                modalBook.show( 'edit', $scope, id );
            }


            $scope.saveBook = function( newBook ) {
                if ( newBook.id ) {
                    var bookIndex = findBookIndexById( newBook.id );

                    if ( !bookIndex && bookIndex !== 0 ) return;

                    $scope.books[ bookIndex ] = angular.copy( newBook );
                    modalBook.hide();
                } else {
                    newBook.id    = uuid.generate();
                    newBook.image = NO_COVER_IMG; 
                    $scope.books.push( newBook );
                    modalBook.hide();
                }
            }

            $scope.removeBookModal = function( book ) {
                modalRemove.show( $scope, book );
            }

            /**
             * Remove a book from the collection and save the new state
             * "delete" word is reserved, let's not mess with it
             */
            $scope.removeBook = function( random ) {
                if ( random ) {
                    if ( (Math.random() < 0.5) ) {
                        alert( 'Thank you Mario, but your luck is in another castle!' );
                        modalRemove.hide();
                        return;
                    } else {
                        alert( 'You ARE lucky!' );
                    }
                }

                var bookIndex = findBookIndexById( $scope.bookToRemove.id );
                $scope.books.splice( bookIndex, 1 );
                modalRemove.hide();
            }

            /**
             * id      {String} book id
             * returns {Number} index in books collection
             */
            function findBookIndexById( id ) {
                // in Backbone you can just write ".where({ id: 0 })"
                for ( var i = 0, lng = $scope.books.length; i < lng; i++ ) {
                    if ( $scope.books[ i ].id === id ) {
                        return i;
                    }
                }

                errors.handle( 'Couldn\'t find a book with id ' + id );
            }
        }
    ]);
});