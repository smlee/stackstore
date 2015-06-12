app.factory('CartFactory', function($http){
	return{
		getCarts: function (userId) {
			return $http.get('/api/order', {
				params: {
					_id: userId
				}
			}).then(function(orders){
				return orders.data;
			});
		},

		editItem: function (cartId, itemId, newInfo) {
			return $http.put('/api/order/'+cartId, {
				params: {
					_id: itemId,
					newData: newInfo
				}
			}).then(function(updatedOrders){
				return updatedOrders.data;
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
				var removeItem = this.getFromLocalStorage('userCart');
	            var updatedItem = removeItem.all_items.filter(function(item){
	                return item.art._id !== itemId;
	            });
	            var cart = JSON.parse(localStorage.userCart)
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
			if (localStorage.userCart !== undefined){
				var updatedCart = JSON.parse(localStorage.userCart);
				updatedCart.all_items.push(cart.all_items[0]);
				localStorage.userCart = JSON.stringify(updatedCart);
			} else {
				localStorage.setItem('userCart', JSON.stringify(cart));
			}
			
		},

		getFromLocalStorage: function(){
			return JSON.parse(localStorage.getItem('userCart'));
		},

		createCart: function(cart){
			console.log('inside createCart')
			return $http.post('/api/order', {params: cart}).then(function(response){
				return response.data
			})
		}

	}
});