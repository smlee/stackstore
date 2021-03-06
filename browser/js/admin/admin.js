app.config(function ($stateProvider, USER_ROLES) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl',
        resolve: {
        	user: function (AuthService) {
        		return AuthService.getLoggedInUser()
        	}
        },
        data: {
            authorizedRoles: [USER_ROLES.admin]
        }
    });

    $stateProvider.state('admin.users', {
        url: '/users/:id',
        templateUrl: 'js/admin/substates/users.html',
        controller: 'AdminUsersCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            users: function (UsersFactory) {
                return UsersFactory.getUsers()
            }
        }
    });

    $stateProvider.state('admin.artwork', {
        url: '/artwork',
        templateUrl: 'js/admin/substates/artwork.html',
        controller: 'AdminArtworkCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            artwork: function (ProductFactory) {
                return ProductFactory.getProduct()
            },
            categories: function (CategoryFactory) {
                return CategoryFactory.getCategories()
            }
        }
    });

    $stateProvider.state('admin.reviews', {
        url: '/reviews',
        templateUrl: 'js/admin/substates/reviews.html',
        controller: 'AdminReviewsCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            artwork: function (ProductFactory) {
                return ProductFactory.getProduct()
            },
            categories: function (CategoryFactory) {
                return CategoryFactory.getCategories()
            }
        }
    });

    $stateProvider.state('admin.events', {
        url: '/events',
        templateUrl: 'js/admin/substates/events.html',
        controller: 'AdminEventsCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            events: function (EventsFactory) {
                return EventsFactory.getEvents()
            }
        }
    });

    $stateProvider.state('admin.orders', {
        url: '/orders',
        templateUrl: 'js/admin/substates/orders.html',
        controller: 'AdminOrdersCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            carts: function (CartFactory) {
                return CartFactory.getCarts()
            }
        }
    });

    $stateProvider.state('admin.promos', {
        url: '/promos',
        templateUrl: 'js/admin/substates/promos.html',
        controller: 'AdminPromosCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            promos: function(PromosFactory){
                return PromosFactory.getAllPromos();
            }
        }
    });

    $stateProvider.state('admin.resetPass', {
        url: '/reset-passwords',
        templateUrl: 'js/admin/substates/resetPass.html',
        controller: 'AdminResetPassCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            users: function (UsersFactory) {
                return UsersFactory.getUsers()
            }
        }
    });
});

app.controller('AdminCtrl', function ($scope, user, $state, $rootScope) {
    $scope.user = user;
});

app.controller('AdminUsersCtrl', function ($scope, $stateParams, user, users, UsersFactory, $state) {
    $scope.user = user;
    $scope.users = users; 

    $scope.deleteUser = function(user){
        UsersFactory.deleteUser(user._id).then(function(){
            UsersFactory.getUsers().then(function(users){
                $scope.users = users;
            });
        });             
    };

    var obj = {
        updateType: 'user',
        info: null
    };

    $scope.promoteAdmin = function(user){
        user.is_admin = true;
        obj.info = user;
        console.dir(user);
        console.dir(obj.info);
        UsersFactory.updateUser(user._id, obj).then(function(){
            //$scope.users = users;
        });
    };

    $scope.demoteAdmin = function(user){
        user.is_admin = false;
        obj.info = user;
        console.dir(user);
        console.dir(obj.info);
        UsersFactory.updateUser(user._id, obj).then(function(){
            //$scope.users = users;
        });
    };
});

app.controller('AdminArtworkCtrl', function ($scope, user, artwork, categories, ProductFactory, $state, $timeout) {

    $scope.user = user;
    $scope.products = artwork;
    $scope.categories = categories;

    $scope.filterProducts = function(){
        var categoryId = $scope.categoryName._id
        ProductFactory.getProduct(categoryId).then(function(response){
            $scope.products = response;
        }); 
    };

    $scope.updateProduct = function (product) {
        ProductFactory.updateProduct(product).then(function(response){
            product.updated = response;
            $timeout(function() {
                product.updated = null;
            }, 1000);
        });
    };

});

app.controller('AdminReviewsCtrl', function ($scope, user, artwork, categories, ReviewsFactory, ProductFactory, $state, $timeout) {

    $scope.user = user;
    $scope.products = artwork;
    $scope.categories = categories;

    $scope.reviews = {};

    $scope.filterProducts = function(){
        var categoryId = $scope.categoryName._id
        ProductFactory.getProduct(categoryId).then(function(response){
            $scope.products = response;
        }); 
    };

    artwork.forEach(function (art) {
        ReviewsFactory.getReviews(art._id)
        .then(function (review) {
            $scope.reviews[art._id] = review
        });
    });

    $scope.updateReview = function (review) {
        ReviewsFactory.updateReview(review).then(function(response){
            review.updated = response
            $timeout(function() {
                review.updated = null;
            }, 1000);
        });
    };
});

app.controller('AdminEventsCtrl', function ($scope, user, events, EventsFactory, $state, $timeout) {

    $scope.user = user;
    $scope.events = events;

    $scope.addEvent = function (event){
        EventsFactory.addEvent(event)
        .then(function(response){
            $scope.addEventMessage = response.message;
            EventsFactory.getEvents().then(function(events){
                $scope.events = events;
                $timeout(function() {
                    $scope.addEventMessage = null;
                }, 1000);
            });

        });
    };

    $scope.updateEvent = function (event) {
        EventsFactory.updateEvents(event).then(function(response){
            event.updated = response;
            $timeout(function() {
                event.updated = null;
            }, 1000);
        });
    };

});

app.controller('AdminOrdersCtrl', function ($scope, user, carts, CartFactory, $state) {

    $scope.user = user;
    $scope.orders = carts;

    $scope.decrementItem = function (item, allItems) {
        for (var i=0; i<allItems.length;i++) {
            if (item._id === allItems[i]._id) {
                if (item.quantity > 0) {
                    item.quantity--
                } else {
                    return
                }
            }
        }
    };

    $scope.incrementItem = function (item, allItems) {
        for (var i=0; i<allItems.length;i++) {
            if (item._id === allItems[i]._id) {
                item.quantity++
            }
        }
    };

    $scope.updateOrder = function (order) {
        delete order.user
        delete order.promo_code
        CartFactory.updateOrder(order._id, order)
        .then(function(response){
            console.log(response)
        });
    };

});

app.controller('AdminPromosCtrl', function ($scope, user, $state, $rootScope, PromosFactory, promos, $timeout) {
    $scope.user = user;
    $scope.promos = promos;

    $scope.addPromoCode = function (promo){
        console.log(promo);
        PromosFactory.addPromos(promo)
        .then(function(response){
            promo.updated = response.message;
            $timeout(function() {
                promo.updated = null;
            }, 1000); 
            PromosFactory.getAllPromos().then(function(promos){
                $scope.promos = promos;
            });
        });
    };
    $scope.updatePromo = function (promo){
        PromosFactory.updatePromo(promo)
        .then(function(response){
            promo.updated = response;              
            $timeout(function() {
                promo.updated = null;
            }, 1000);            
        });
    };

    $scope.deletePromo = function (promo){
        PromosFactory.deletePromo(promo)
        .then(function(response){
            promo.updated = response.message;
            $timeout(function() {
                promo.updated = null;
            }, 1000); 
            PromosFactory.getAllPromos().then(function(promos){
                $scope.promos = promos;
            });
        });
    };
});

app.controller('AdminResetPassCtrl', function ($scope, user, users, $state, $rootScope, UsersFactory, $timeout) {
    $scope.user = user;
    $scope.users = users; 
        
    var obj = {
        updateType: 'user',
        info: null
    };

    $scope.resetOneUser = function (user){
        obj.info = user;
        user.reset_Password = true;
        user.resetMessage = "User Will Be Prompted To Change Password";
        UsersFactory.updateUser(user._id, obj)
        $timeout(function() {
            user.resetMessage = null;
        }, 1000); 
    };

    $scope.resetAllUsers = function (){
        $scope.resetMessage = "User Will Be Prompted To Change Password";
        UsersFactory.updateAllUsersWithProp({reset_Password: true})
        $timeout(function() {
            $scope.resetMessage = null;
        }, 1000); 
    };
});

app.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});



