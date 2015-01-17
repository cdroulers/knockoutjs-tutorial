"use strict";
define([
    'knockout',
    'durandal/app',
    'models/cartProduct'
], function (ko, app, CartProduct) {
    var service = {};

    service.cart = ko.observableArray([]);

    service.add = function (data) {
        var item = service.find(data);
        item.addUnit();
    };

    service.subtract = function (data) {
        var item = service.find(data);
        item.removeUnit();
    };

    service.grandTotal = ko.computed(function () {
        var tmpCart = service.cart();
        var total = 0;
        tmpCart.forEach(function(item){
            total+= (item.units() * item.product.price());
        });
        return total;
    });

    service.find = function (data) {
        var tmp;
        service.cart().forEach(function (item) {
            if (item.product.id() === data.id()) {
                tmp = item;
            }
        });
        return tmp;
    };

    service.remove = function (data) {
        var tmp = service.find(data);
        var units = tmp.product.stock() + tmp.units();
        tmp.product.stock(units);
        service.cart.remove(tmp);
    };

    service.update = function (catalog) {
        var cart = service.cart();
        var newCart = [];
        for (var i = 0; i < catalog.length; i++) {
            for (var j = 0; j < cart.length; j++) {
                var catalogItem = catalog[i];
                var cartItem = cart[j];
                if (cartItem.product.id() === catalogItem.id()) {
                    catalogItem.stock(catalogItem.stock() - cartItem.units());
                    newCart.push(new CartProduct(catalogItem, cartItem.units()));
                }
            }
        }
        service.cart(newCart);
    }
    return service;
});