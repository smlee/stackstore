app.config(function ($stateProvider) {

    $stateProvider.state('invoice', {
        url: '/invoice',
        templateUrl: 'js/invoice/invoice.html',
        controller: 'InvoiceCtrl'
    });

});

app.controller('InvoiceCtrl', function($scope){

});