"use strict";
var vm = (function () {

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
        clear: function () {
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
    var filteredCatalog = ko.observableArray(catalog());
    var filterCatalog = function () {
        //if catalog is empty return empty array
        if (!catalog()) {
            return [];
        }
        var filter = searchTerm().toLowerCase();
        //if filter is empty return all the catalog
        if (!filter) {
            filteredCatalog(catalog());
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
        filteredCatalog(filtered);
    };

    var cart = ko.observableArray([]);

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

    var visibleCatalog = ko.observable(true);    
    var visibleCart = ko.observable(false);

    var showOrder = function () {
        visibleCatalog(false);
    };

    var showCatalog = function () {
        visibleCatalog(true);
    };

    var finishOrder = function() {
        cart([]);
        visibleCart(false);
        showCatalog();
        $("#finishOrderModal").modal('show');
    };

    var showSearchBar = ko.observable(true);

    var debug = ko.observable(false);

    var showDebug = function () {
        debug(true);
    };

    var hideDebug = function () {
        debug(false);
    };

    return {
        debug: debug,
        showDebug: showDebug,
        hideDebug: hideDebug,

        // First chapter
        catalog: filteredCatalog,
        filterCatalog: filterCatalog,
        newProduct: newProduct,
        addProduct: addProduct,
        searchTerm: searchTerm,

        // Second chapter
        cart: cart,
        removeFromCart: removeFromCart,
        totalItems: totalItems,
        grandTotal: grandTotal,
        showOrder: showOrder,
        showCatalog: showCatalog,
        finishOrder: finishOrder,
        visibleCatalog: visibleCatalog,
        visibleCart: visibleCart,
        showSearchBar: showSearchBar
    };
})();

infuser.defaults.templateSuffix = ".html";
infuser.defaults.templateUrl = "views";

$(document).on("click", "#confirmOrderBtn", function () {
    vm.showOrder();
});

ko.applyBindings(vm);

// Bind to global scope for debugging.
window.vm = vm;