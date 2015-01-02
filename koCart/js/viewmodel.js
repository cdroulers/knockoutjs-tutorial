"use strict";
var vm = (function () {
    var productSvc = new ProductService();

    var allCallbackSuccess = function (response) {
        catalog([]);
        response.data.forEach(function (item) {
            catalog.push(new Product(item.id, item.name, item.price, item.stock));
        });
        filteredCatalog(catalog());
        ko.applyBindings(vm);
    };

    var catalog = ko.observableArray([]);

    var newProduct = {
        name: ko.observable(''),
        price: ko.observable(''),
        stock: ko.observable(''),
        clear: function () {
            this.name('');
            this.price('');
            this.stock('');
        }
    };

    var addProduct = function (data) {
        var id = new Date().valueOf();
        var product = new Product(
            id,
            data.name(),
            data.price(),
            data.stock()
        );

        productSvc.create(product.toObj()).done(function (response) {
            catalog.push(product);
            filteredCatalog(catalog());
            newProduct.clear();
            $('#addToCatalogModal').modal('hide');
        });
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

    var activate = function () {
        productSvc.all().done(allCallbackSuccess);
    };

    var showDescription = function (data) {
        productSvc.get(data.id()).done(function (response) {
            alert(response.data.description);
        });
    };

    return {
        activate: activate,
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
        showSearchBar: showSearchBar,
        showDescription: showDescription
    };
})();

infuser.defaults.templateSuffix = ".html";
infuser.defaults.templateUrl = "views";

vm.activate();

$(document).on("click", "#confirmOrderBtn", function () {
    vm.showOrder();
});

// Bind to global scope for debugging.
window.vm = vm;