(function(){

    'use strict';

    var registerController = function( $scope, $state, AuthenticationFactory ){

        var _self = this;

        _self.listAlerts = [];

        $scope.addAlert = function(type, options) {
            _self[type].push(options);
        };

        $scope.closeAlert = function(type, index) {
            _self[type].splice(index, 1);
        };

        _self.register = function() {

            _self.user.username = _self.user.email;

            AuthenticationFactory.register(_self.user).success(function( response ) {
            
              if ( response.success ) {
                
                $scope.addAlert('listAlerts', {
                    type: 'success',
                    msg: 'Your registration is successful.'
                });               

              }


            }).error(function(err, data) {

                $scope.addAlert('listAlerts', {
                    type: 'danger',
                    msg: err.err
                });   

                console.log(_self.listAlerts)

            });
          
        };    
    };


    angular.module('cereliApp').controller('registerController', registerController);

    registerController.$inject = [ '$scope', '$state', 'AuthenticationFactory' ];

})();

