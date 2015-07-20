app.factory('CartFactory', function($http){
    return{
        getOrderHistory: function(userId){
            return $http.get('/api/order',  {params: { _id: userId}}).then(function(orders){
                return orders.data;
            });
        },
        getCarts: function (userId) {
            if (userId) {
                return $http.get('/api/order/' + userId)
                    .then(function(orders){
                        return orders.data;
                    })
            } else {
                return $http.get('/api/order')
                    .then(function(orders){
                        return orders.data;
                    })
            }
        },

        getCartById: function(cartId) {
            return $http.get('/api/order/id/'+cartId).then(function(order){
                return order.data;
            })
        },

        editItem: function (cartId, itemId, quantity) {

            return $http.put('/api/order/update/'+cartId, {
                params: {
                    _id: itemId,
                    quantity: quantity
                }
            }).then(function(updatedOrders){
                var quants = 0,subtotal = 0;
                updatedOrders.data.all_items.forEach(function (ele) {
                    quants += ele.quantity;
                    subtotal += (ele.art.price*ele.quantity);
                });
                updatedOrders.data.subtotal = subtotal;
                updatedOrders.data.subQuantity = quants;
                return updatedOrders.data;
            });

        },

        editLocal: function(idx, newInfo) {
            var quants = 0,subtotal = 0;
            var cart = this.getFromLocalStorage();
            cart.all_items[idx].quantity = newInfo;
            cart.all_items.forEach(function (ele) {
                quants += ele.quantity;
                subtotal += (ele.art.price*ele.quantity);
            });
            cart.subtotal = subtotal;
            cart.subQuantity = quants;

            localStorage.userCart = JSON.stringify(cart);
        },

        updateOrder: function(cartId, newInfo){
            return $http.put('/api/order/update', { params: {_id: cartId, newData: newInfo} })
                .then(function(order){
                    return order.data
                });
        },

        updateStatus: function(cartId, status){
            return $http.put('/api/order/update/status/'+cartId, {params: status})
                .then(function(order){
                    return order.data
                })
        },

        removeItem: function (cartId, itemId) {
            return $http.delete('/api/order/' + cartId, {
                params: {
                    _id: itemId
                }
            })
                .then(function (response) {
                    return response.data;
                });

        },

        removeItemLocal: function(idx, itemId) {

            var cart = this.getFromLocalStorage();
            var updatedItem = cart.all_items.filter(function(item){
                return item.art._id !== itemId;
            });
            cart.all_items = updatedItem;
            localStorage.userCart = JSON.stringify(cart);
        },

        submitOrder: function (orderId) {
            return $http.put('/api/order/submit', {
                params: {
                    _id: orderId
                }
            })
                .then(function(response){
                    return response.data;
                });
        },

        addToLocalStorage: function(cart){
            console.log('adding cart to ls', cart)
            if (localStorage.userCart !== undefined){
                var updatedCart = this.getFromLocalStorage();
                console.log('this be updatedCart', updatedCart)
                updatedCart.all_items.push(cart.all_items[0]);
                localStorage.userCart = JSON.stringify(updatedCart);
            } else {
                console.log('new cart added!')
                localStorage.setItem('userCart', JSON.stringify(cart));
            }

        },

        getFromLocalStorage: function(){
            return JSON.parse(localStorage.getItem('userCart'));
        },

        createCart: function(cart){

            return $http.post('/api/order', {params: cart}).then(function(response){
                return response.data;
            })
        },

        pushItem: function(cartid, item){
            console.log('inside pushItem', cartid, item);
            return $http.put('/api/order/push', { params: {_id: cartid, newData: item} }).then(function(response){
                return response.data;
            });
        },

        syncCart: function(userId) {
            var self = this;
            this.getCarts(userId).then(function(cart){
                // if they have a cart, add to it from localStorage to database
                if(cart.length !== 0){

                    self.updateOrder(cart._id, self.getFromLocalStorage())
                } else {
                    var newCart = self.getFromLocalStorage();
                    newCart['user'] = userId;
                    self.createCart(newCart).then(function (result) {
                    })
                }
            })
        }

    }
});