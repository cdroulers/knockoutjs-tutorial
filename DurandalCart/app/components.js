"use strict";
define([
    'knockout',
    'models/cartProduct'
], function (ko, CartProduct) {
    var module = {};
    module.init = function () {
        ko.components.register('add-to-cart-button', {
            viewModel: function (params) {
                this.item = params.item;
                this.cart = params.cart;

                this.addToCart = function () {
                    var data = this.item;
                    var tmpCart = this.cart();
                    var n = tmpCart.length;
                    var item = null;

                    while (n--) {
                        if (tmpCart[n].product.id() === data.id()) {
                            item = tmpCart[n];
                        }
                    }

                    if (item) {
                        item.addUnit();
                    } else {
                        item = new CartProduct(data, 1);
                        this.cart.push(item);
                    }
                };
            },
            template: '<button class="btn btn-primary" data-bind="click: addToCart"><i class="glyphicon glyphicon-plus-sign"></i> Add</button>'
        });
    };

    return module;
});