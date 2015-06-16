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
        url: '/admin/users/:id',
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
        url: '/admin/artwork',
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
        url: '/admin/reviews',
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
        url: '/admin/events',
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
        url: '/admin/orders',
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
        url: '/admin/promos',
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
        url: '/admin/reset-passwords',
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

app.controller('AdminArtworkCtrl', function ($scope, user, artwork, categories, ProductFactory, $state) {

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
            product.updated = response
        });
    };

});

app.controller('AdminReviewsCtrl', function ($scope, user, artwork, categories, ReviewsFactory, ProductFactory, $state) {

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
            // console.log(review)
            $scope.reviews[art._id] = review
        });
    });

    $scope.updateReview = function (review) {
        ReviewsFactory.updateReview(review).then(function(response){
            review.updated = response
        });
    };
});

app.controller('AdminEventsCtrl', function ($scope, user, events, EventsFactory, $state) {

    $scope.user = user;
    $scope.events = events;

    $scope.addEvent = function (event){
        EventsFactory.addEvent(event)
        .then(function(response){
            console.log(response);

            event.updated = response.message;
        });
    };

    $scope.updateEvent = function (event) {
        EventsFactory.updateEvents(event).then(function(response){
            event.updated = response
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

app.controller('AdminPromosCtrl', function ($scope, user, $state, $rootScope, PromosFactory, promos) {
    $scope.user = user;
    $scope.promos = promos;

    $scope.addPromoCode = function (promo){
        console.log(promo);
        PromosFactory.addPromos(promo)
        .then(function(response){
            console.log(response);

            promo.updated = response.message;
        });
    };
    $scope.updatePromo = function (promo){
        
        
        PromosFactory.updatePromo(promo)
        .then(function(response){
            promo.updated = response;
                        
            // $timeout(function() {
            //     promo.updated = null
            // }, 2000);
        });
    };

    $scope.deletePromo = function (promo){
        PromosFactory.deletePromo(promo)
        .then(function(response){
            promo.updated = response
        });
    };
});

app.controller('AdminResetPassCtrl', function ($scope, user, users, $state, $rootScope, UsersFactory) {
    $scope.user = user;
    $scope.users = users; 
        
    var obj = {
        updateType: 'user',
        info: null
    };

    $scope.resetOneUser = function (user){
        obj.info = user;
        user.reset_Password = true;
        UsersFactory.updateUser(user._id, obj).then(function(message){
            console.log(message); 
        });
    };

    $scope.resetAllUsers = function (){
        UsersFactory.updateAllUsersWithProp({reset_Password: true}).then(function(message){
            console.log(message); 
        });
    };
});





