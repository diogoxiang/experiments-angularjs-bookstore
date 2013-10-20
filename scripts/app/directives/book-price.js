/**
 * Pastes a block with price 
 * with or without discount
 */
define([
    '../app'
], function(
    app
) {

    return app.directive('bookPrice', function() {
        return {
            templateUrl: './scripts/app/templates/book-price.html'
        }
    });

});