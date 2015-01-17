define([
    "durandal/app",
    "plugins/router",
    "services/logger",
    "services/product",
    "models/product"
], function (app, router, logger, ProductService, Product) {
    var productService = new ProductService();
    var vm = {};

    vm.title = "New product";

    vm.btn = "Add product";

    vm.edit = function () {
        productService.create(vm.product.toObj()).then(function (response) {
            logger.success("Product added", "New product " + vm.product.name() + " added");
            router.navigate("#/catalog");
            app.trigger("catalog:refresh");
        });
    };

    vm.activate = function () {
        vm.product = new Product();
    };

    return vm;
});