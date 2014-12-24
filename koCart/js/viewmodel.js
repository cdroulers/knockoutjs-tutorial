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
    var searchTerm = ko.observable('');
    var filteredCatalog = ko.computed(function () {
        //if catalog is empty return empty array
        if (!catalog()) {
            return [];
        }
        var filter = searchTerm().toLowerCase();
        //if filter is empty return all the catalog
        if (!filter) {
            return catalog();
        }
        //filter data
        var filtered = ko.utils.arrayFilter(catalog(), function (item) {
            var fields = ["name"]; //we can filter several properties
            var i = fields.length;
            while (i--) {
                var prop = fields[i];
                if (item.hasOwnProperty(prop) && ko.isObservable(item[prop])) {
                    var strProp = ko.utils.unwrapObservable(item[prop]).toLocaleLowerCase();
                    if (item[prop]() && (strProp.indexOf(filter) !== -1)) {
                        return true;
                    }
                }
            }
            return false;
        });
        return filtered;
    });
    var cart = ko.observableArray([]);
    var showCartDetails = function () {
        if (cart().length > 0) {
            $("#cartContainer").removeClass("hidden");
        }
    };

    var addToCart = function (data) {
        var item = null;
        var tmpCart = cart();
        var n = tmpCart.length;

        while (n--) {
            if (tmpCart[n].product.id() === data.id()) {
                item = tmpCart[n];
            }
        }

        if (item) {
            item.addUnit();
        } else {
            item = new CartProduct(data, 1);   
            cart.push(item);
        }
    };

    var removeFromCart = function (data) {
        var units = data.units();
        var stock = data.product.stock();

        data.product.stock(units + stock);
        cart.remove(data);
    };

    var totalItems = ko.computed(function () {
        var tmpCart = cart();
        var total = 0;
        tmpCart.forEach(function (item) {
            total += parseInt(item.units(), 10);
        });
        return total;
    });

    var grandTotal = ko.computed(function () {
        var tmpCart = cart();
        var total = 0;
        tmpCart.forEach(function (item) {
            total += item.units() * item.product.price();
        });
        return total;
    });

    var hideCartDetails = function () {
        $("#cartContainer").addClass("hidden");
    };

    var showOrder = function () {
        $("#catalogContainer").addClass("hidden");
        $("#orderContainer").removeClass("hidden");
    };

    var showCatalog = function () {
        $("#catalogContainer").removeClass("hidden");
        $("#orderContainer").addClass("hidden");
    };

    var finishOrder = function() {
        cart([]);
        hideCartDetails();
        showCatalog();
        $("#finishOrderModal").modal('show');
    };

    return {
        // First chapter
        catalog: filteredCatalog,
        newProduct: newProduct,
        addProduct: addProduct,
        searchTerm: searchTerm,

        // Second chapter
        cart: cart,
        showCartDetails: showCartDetails,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        totalItems: totalItems,
        grandTotal: grandTotal,
        hideCartDetails: hideCartDetails,
        showOrder: showOrder,
        showCatalog: showCatalog,
        finishOrder: finishOrder
    };
})();

ko.applyBindings(vm); //Here we link KO and the view

// Bind to global scope for debugging.
window.vm = vm;