define([
    'plugins/http',
    'plugins/router',
    'durandal/app',
    'services/log',
    'knockout',
    'services/product',
    'services/cart'
], function (http, router, app, logger, ko, ProductService, CartService) {
    var productService = new ProductService();
    var cartService = new CartService();

    var vm = {
        title: 'Catalog'
    };

    vm.showSearchBar = ko.observable(true);
    vm.searchTerm = ko.observable("");
    vm.catalog = ko.observableArray([]);
    vm.filteredCatalog = ko.observableArray([]);

    vm.filterCatalog = function () {
        if (!vm.catalog()) {
            vm.filteredCatalog([]);
        }
        var filter = vm.searchTerm().toLowerCase();
        if (!filter) {
            vm.filteredCatalog(vm.catalog());
        }
        //filter data
        var filtered = ko.utils.arrayFilter(vm.catalog(), function (item) {
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
        vm.filteredCatalog(filtered);
    };

    vm.edit = function(item) {
        router.navigate('#/edit/'+item.id());
    };

    vm.remove = function(item) {
        app.showMessage(
            'Are you sure you want to delete this item?',
            'Delete Item',
            ['Yes', 'No']
        ).then(function (answer) {
            if (answer === "Yes") {
                productService.remove(item.id()).then(function (response) {
                    vm.refresh();
                    cartService.remove(item);
                });
            }
        });
    };

    vm.refresh = function () {
        return productService.all().then(function (response) {
            vm.catalog([]);
            response.data.forEach(function (item) {
                vm.catalog.push(new Product(item.id, item.name, item.price, item.stock));
            });
            var catalog = vm.catalog();
            cartService.update(catalog);
            vm.catalog(catalog);
            vm.filteredCatalog(catalog);
            logger.success("Downloaded " + catalog.length + " products", "Catalog loaded");
        });
    };

    vm.activate = function() {
        if (vm.catalog().length === 0) {
            app.on("catalog:refresh").then(function () {
                vm.refresh();
            });

            return vm.refresh();
        } else {
            return true;
        }
    }

    return vm;
});