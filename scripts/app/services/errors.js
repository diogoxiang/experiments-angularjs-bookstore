/**
 * Handle errors
 */
define([
    '../app'

  , 'pnotify'
], function(
    app
) {

    app.factory('errors', function() {
        function handle( message ) {
            $.pnotify({
                type : 'error'
              , title: 'Error'
              , text : message
              , addclass: 'alert-danger' // pnofify fix for bootstrap 3
            });
        }

        return {
            handle: handle
        };
    });

});