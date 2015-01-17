define([
    'durandal/app',
    'plugins/router',
    'services/logger',
    'services/cart'
],function(app, router, logger, CartService){
    var vm = {};

    vm.cart = CartService.cart;

    vm.addUnit = function (data) {
        CartService.add(data.product);
    };

    vm.removeUnit = function (data) {
        if (data.units() === 1) {
            remove(data);
        } else {
            CartService.subtract(data.product);
        }

    };

    vm.removeProduct = function (data) {
        remove(data);
    };

    vm.toOrder = function () {
        router.navigate('#/order');
    }
    
    vm.canActivate = function () {
        var result = vm.cart().length > 0;

        if (!result) {
            logger.error("Select some products before", "Cart is empty");
            return { redirect: '#/catalog' };
        }

        return result;
    }

    function remove(data) {
        app.showMessage(
            'Are you sure you want to delete this item?',
            'Delete Item',
            ['Yes', 'No']
        ).then(function (answer) {
            if (answer === "Yes") {
                CartService.remove(data.product);
                logger.success("Product removed");
            } else {
                logger.success("Deletion canceled");
            }
        });
    }
    return vm;
});