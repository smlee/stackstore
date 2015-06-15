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
            carts: function (AuthService, CartFactory) {
                return AuthService.getLoggedInUser()
                .then(function (user) {
                    if (user) return CartFactory.getCarts(user._id)
                    return CartFactory.getFromLocalStorage();
                })
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
    }

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
    }

    $scope.demoteAdmin = function(user){
        user.is_admin = false;
        obj.info = user;
        console.dir(user);
        console.dir(obj.info);
        UsersFactory.updateUser(user._id, obj).then(function(){
            //$scope.users = users;
        });
    }
});

app.controller('AdminArtworkCtrl', function ($scope, user, artwork, categories, ProductFactory, $state) {

    $scope.user = user
    $scope.products = artwork;
    $scope.categories = categories;

    $scope.filterProducts = function(){
        var categoryId = $scope.categoryName._id
        ProductFactory.getProduct(categoryId).then(function(response){
            $scope.products = response;
        }); 
    }

    $scope.updateProduct = function (product) {
        ProductFactory.updateProduct(product).then(function(response){
            product.updated = response
        })
    }

});

app.controller('AdminReviewsCtrl', function ($scope, user, artwork, categories, ReviewsFactory, ProductFactory, $state) {

    $scope.user = user
    $scope.products = artwork;
    $scope.categories = categories;

    $scope.reviews = {}

    $scope.filterProducts = function(){
        var categoryId = $scope.categoryName._id
        ProductFactory.getProduct(categoryId).then(function(response){
            $scope.products = response;
        }); 
    }

    artwork.forEach(function (art) {
        ReviewsFactory.getReviews(art._id)
        .then(function (review) {
            // console.log(review)
            $scope.reviews[art._id] = review
        })
    });

});

app.controller('AdminEventsCtrl', function ($scope, user, events, $state) {

    $scope.user = user
    $scope.events = events

});

app.controller('AdminOrdersCtrl', function ($scope, user, carts, $state) {

    $scope.user = user
    $scope.cart = carts;

});