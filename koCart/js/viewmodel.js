var vm = (function () {
    "use strict";

    var catalog = ko.observableArray([
        new Product(1, "T-Shirt", 10.00, 20),
        new Product(2, "Trousers", 20.00, 10),
        new Product(3, "Shirt", 15.00, 20),
        new Product(4, "Shorts", 5.00, 10)
    ]);

    var newProduct = {
        name:ko.observable(''),
        price:ko.observable(''),
        stock:ko.observable(''),
        clear: function() {
            this.name('');
            this.price('');
            this.stock('');
        }
    };

    var addProduct = function (context) {
        var id = new Date().valueOf();//random id from time
        var product = new Product(
            id,
            context.name(),
            context.price(),
            context.stock()
            );
        catalog.push(product);
        newProduct.clear();
    };

    return {
        catalog: catalog,
        newProduct: newProduct,
        addProduct: addProduct
    };
})();

ko.applyBindings(vm); //Here we link KO and the view

// Bind to global scope for debugging.
window.vm = vm;