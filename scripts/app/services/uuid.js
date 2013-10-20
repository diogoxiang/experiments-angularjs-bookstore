/**
 * Generate UUID
 */
define([
    '../app'
], function(
    app
) {

    app.factory('uuid', function() {
        function generate() {
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });

            return uuid;
        }

        return {
            generate: generate
        };
    });

});