app.factory('CartFactory', function($http){
	return{
		getCarts: function (userId) {
			return $http.get('/api/order', {
				params: {
					_id: userId
				}
			}).then(function(orders){
				return orders.data[0];
			});
		},

		editItem: function (cartId, itemId, quantity) {
			return $http.put('/api/order/'+cartId, {
				params: {
					_id: itemId,
					quantity: quantity
				}
			}).then(function(updatedOrders){
				return updatedOrders.data;
			});
		},

		updateOrder: function(cartId, newInfo){
			return $http.put('/api/order/update', { params: {_id: cartId, newData: newInfo} })
				.then(function(order){ 
					return order.data 
				});
		},

		removeItem: function (cartId, itemId, idx) {
			if(cartId){
				return $http.delete('/api/order/'+cartId, {
					params: {
						_id: itemId
					}
				})
		.then(function(response){
					return response.data;
				});	
			} else {
				var cart = this.getFromLocalStorage();
				var all_items = cart.all_items;
	            var updatedItem = cart.all_items.filter(function(item){
	                return item.art._id !== itemId;
	            });
	            cart.all_items = updatedItem;
	            localStorage.userCart = JSON.stringify(cart);
			}
			
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
			console.log('inside createCart')
			return $http.post('/api/order', {params: cart}).then(function(response){
				return response.data;
			})
		},

		pushItem: function(cartid, item){
			console.log('inside pushItem', cartid, item);
			return $http.put('/api/order/push', { params: {_id: cartid, newData: item} }).then(function(response){
				return response.data;
			});
		}

	}
});