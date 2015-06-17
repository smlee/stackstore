app.config(function ($stateProvider) {

    $stateProvider.state('invoice', {
        url: '/invoice/:id',
        templateUrl: 'js/invoice/invoice.html',
        controller: 'InvoiceCtrl'
    });

});

app.controller('InvoiceCtrl', function($scope, $stateParams){
    console.log($stateParams)
});