define([
    "knockout",
    "durandal/app",
    "plugins/router",
    "services/logger",
    "services/cart",
    "models/customer",
    "services/order"
], function (ko, app, router, logger, CartService, customer, OrderService) {
    var orderService = new OrderService();
    var vm = {};

    vm.countries = ko.observableArray(['United States', 'United Kingdom']);

    vm.cart = CartService.cart;

    vm.grandTotal = CartService.grandTotal;

    vm.customer = customer;

    vm.finishOrder = function () {
        orderService.create({
            customer: vm.customer,
            order: vm.cart
        }).then(function (response) {
            app.showMessage(
                "Your order id is: <strong>" + response.data.orderId + "</strong>",
                'Order processed successfully'
            ).then(function () {
                logger.success("Order completed");
                CartService.cart([]);
                router.navigate("#/catalog");
                app.trigger("catalog:refresh");
            });
        });
    }

    vm.canActivate = function () {
        var result = vm.cart().length > 0;

        if (!result) {
            logger.error("Select some products before", "Cart is empty");
            return { redirect: '#/catalog' };
        }

        return result;
    }

    return vm;
});