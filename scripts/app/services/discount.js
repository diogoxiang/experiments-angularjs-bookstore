/**
 * returns {Object} information about book price and discount 
 */
define([
    '../app'

  , '../services/errors'
], function(
    app
) {

    app.factory('discount', ['errors', function( errors ) {
        /**
         * book    {Object}
         *
         * returns {Object} { price: { new, current }, discount: discount percent || 0 }
         */
        function discount( book ) {
            // Special algorithm developed by sales department
            var discount = 0
              , newPrice;

            switch( book.category ) {
                case 'cookbook':
                    discount += book.price < 16 ? 1.5 : 3;
                    break;
                case 'computers':
                    discount += book.quantity < 30 ? 0.5 : 1
                    break;
                case 'science':
                    discount += 0.5
                    break;
            }

            if ( book.quantity > 50 ) {
                discount += 2
            } else if ( book.quantity > 100 ) {
                discount += 5
            }

            newPrice = book.price * ( 1 - discount / 100 );

            return {
                priceCurrent: num( book.price, book )
              , priceNew    : num( formatPrice(newPrice), book )
              , discount    : num( formatPrice(discount), book )
            }
        }


        /**
         * returns fixed price for whole numbers
         */
        function formatPrice( num ) {
            return ( num % 1 !== 0 ) ? num.toFixed( 2 ) : num;
        }

        /**
         * returns {Number}
         */
        function num( str, book ) {
            var value = str / 1;

            if ( isNaN(value) ) {
                errors.handle( 'Couldn\'t get a price for book with id ' + book.id );
                value = 0;
            }

            return value;
        }


        return discount;
    }]);
});