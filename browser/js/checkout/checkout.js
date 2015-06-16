app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            cart: function (AuthService, CartFactory) {
                return AuthService.getLoggedInUser()
                    .then(function (user) {
                        if (user) return CartFactory.getCarts(user._id)
                        return CartFactory.getFromLocalStorage();
                    })
            },
            contacts: function (ContactFactory, AuthService) {
                return AuthService.getLoggedInUser()
                    .then(function (user) {
                        return ContactFactory.getContacts(user._id)
                    })

            }
        }
    });
});

app.controller('CheckoutCtrl', function ($scope, united, $state, user, cart, contacts, $modal,$log, CartFactory){

    $scope.contacts = contacts.contact[0];
    $scope.cart = cart;

    $scope.open = function (size, title) {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: '/js/checkout/address.html',
            controller: 'addressCtrl',
            size: size,
            resolve: {
                title: function () {
                    return title;
                },
                user: function (AuthService) {
                    return AuthService.getLoggedInUser()
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    //Payment section
    $scope.creditCards = ['Visa', 'Master Card', 'Discover', 'AMEX'];
    $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
    $scope.years = [2015, 2016, 2017, 2018, 2019, 2020];

    var cartId = CartFactory.getFromLocalStorage()._id;
    console.log('this is cart id in paymentCtrl', cartId)
    $scope.sendCardInfo = function(info){
        console.log('this is the user\'s card info!!!!', info);

        CartFactory.updateStatus(cartId, {paid: true}).then(function(response){
            $state.go('invoice');
        });


    }

});

app.controller('addressCtrl', function($scope, $modalInstance, user, united, title, ContactFactory){
    $scope.title = title;
    $scope.contactType = ['shipping', 'billing', 'home', 'event'];
    $scope.states = united.states;

    $scope.sendAddressInfo = function(info){
        ContactFactory.sendNewContactInfo(user._id, info).then(function(response){
            $modalInstance.close();
        });
    };
});