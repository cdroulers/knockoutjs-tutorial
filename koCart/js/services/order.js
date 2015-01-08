"use strict";
define([
    'jquery'
], function ($) {
    function OrderService() {
        function create(order) {
            return $.ajax({
                type: 'POST',
                url: '/order',
                data: order
            });
        }
        return {
            create: create
        };
    };

    return OrderService;
});