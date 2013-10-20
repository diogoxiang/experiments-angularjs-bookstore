/**
 * Why not?
 */
define([
    '../app'
], function(
    app
) {
    return app.controller('poniesController', ['$scope'
      , function( $scope ) {
            var messages = [
                'What? Even more ponies?!'
              , 'Not enough ponies for you?'
              , 'You really like ponies, don’t you?'
              , 'Are you a Django fan?'
              , 'Oh, yeah, click me again!'
            ];

            $scope.ponies = false;

            $scope.addPonies = function() {
                if ( $scope.ponies ) {
                    alert( messages[Math.floor(Math.random()*messages.length)] );
                    return;
                }

                $scope.ponies = true;

                require([
                    'http://panzi.github.io/Browser-Ponies/basecfg.js'
                  , 'http://panzi.github.io/Browser-Ponies/browserponies.js'
                ], function() {
                    (function (cfg) {BrowserPonies.setBaseUrl(cfg.baseurl);BrowserPonies.loadConfig(BrowserPoniesBaseConfig);BrowserPonies.loadConfig(cfg);})({"baseurl":"http://panzi.github.io/Browser-Ponies/","fadeDuration":500,"volume":1,"fps":25,"speed":3,"audioEnabled":false,"showFps":false,"showLoadProgress":true,"speakProbability":0.1,"spawn":{"applejack":1,"fluttershy":1,"pinkie pie":1,"rainbow dash":1,"rarity":1,"twilight sparkle":1},"autostart":true});
                });
            }


        }
    ]);
});