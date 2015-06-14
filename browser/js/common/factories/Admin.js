app.factory('AdminFactory', function($http){
	return{
		getUsers: function (userId) {
			return $http.get('/api/order', {
				params: {
					_id: userId
				}
			}).then(function(orders){
				return orders.data;
			});
		}

		// editItem: function (cartId, itemId, newInfo) {
		// 	return $http.put('/api/order/'+cartId, {
		// 		params: {
		// 			_id: itemId,
		// 			newData: newInfo
		// 		}
		// 	}).then(function(updatedOrders){
		// 		return updatedOrders.data;
		// 	});
		// },

		// removeItem: function (cartId, itemId) {
		// 	return $http.delete('/api/order/'+cartId, {
		// 		params: {
		// 			_id: itemId
		// 		}
		// 	})
		// 	.then(function(response){
		// 		return response.data;
		// 	});
		// },

		// submitOrder: function (orderId) {
		// 	return $http.put('/api/order/submit', {
		// 		params: {
		// 			_id: orderId
		// 		}
		// 	})
		// 	.then(function(response){
		// 		return response.data;
		// 	});
		// }

	}
});