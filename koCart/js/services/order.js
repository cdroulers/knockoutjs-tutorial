"use strict";
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
}