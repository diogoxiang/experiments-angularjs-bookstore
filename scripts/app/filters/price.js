/**
 * Gets price object from discount service
 * and returns values from it to templates
 *
 * @example book | price:{ type: 'discount' }
 */
define([
    '../app'

  , 'pnotify'
  , '../services/discount'
  , '../services/errors'
], function(
    app
) {

    app.filter('price', ['discount', 'errors', function( discount, errors ) {
        var DEFAULT       = '—'
          , errorMessages = {
                args: function( book, args ) {
                    return [
                        'Couldn\'t get a price for ' + book.id
                     , '\nMissing required “type” argument.'
                      , '\nUsage example: book | price:{ type: \'discount\' }'
                    ].join( '' );
                }
              , type: function( book, args ) {
                    return [
                        'Couldn\'t get a price for ' + book.id
                      , '\nTried to get “' + args.type + '” argument'
                      , '\nwhich is not exist.'
                    ].join( '' );
                }
            };


        function filter( book, args ) {
            if ( !args || !args.type ) {
                errors.handle( errorMessages.args( book, args ) );
                return DEFAULT;
            }

            var price = discount( book )
              , value = price[ args.type ];

            if ( !value && value !== 0 ) {
                errors.handle( errorMessages.type( book, args ) );
                return DEFAULT;
            }

            return value;
        }


        return filter;
    }]);

});