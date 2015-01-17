define([
    "durandal/app",
    "plugins/router",
    "services/logget",
    "services/product",
    "models/product"
],function(app, router, logger, ProductService, Product){
    var productService = new ProductService;
    var vm = {};

    vm.title = "Edit Product";

    vm.btn = "Edit product";

    vm.activate = function (id) {
        return productService.get(id).then(function (response) {
            var p = response.data;
            if (p) {
                vm.product = new Product(p.id, p.name, p.price, p.stock);
            } else {
                logger.error("We didn't find product with id: "+id)
                router.navigate('#/catalog');
            }
        });
    };

    vm.edit = function() {
        productService.save(vm.product.toObj()).then(function (response) {
            logger.success("Product saved", "Product " + vm.product.name() + " saved");
            router.navigate("#/catalog");
            app.trigger("catalog:refresh");
        });
    };
    
    return vm;
});