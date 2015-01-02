"use strict";
function ProductService() {
    function all() {
        return $.ajax({
            type: 'GET',
            url: '/products',
            dataType: "json"
        });
    }

    function get(id) {
        return $.ajax({
            type: 'GET',
            url: '/products/' + id,
            dataType: "json"
        });
    }

    function create(product) {
        return $.ajax({
            type: 'POST',
            url: '/products',
            data: product,
            dataType: "json"
        });
    }

    function update(product) {
        return $.ajax({
            type: 'PUT',
            url: '/products/' + product.id,
            data: product,
            dataType: "json"
        });
    }

    function remove(id) {
        return $.ajax({
            type: 'DELETE',
            url: '/products/' + id,
            dataType: "json"
        });
    }

    return {
        all: all,
        get: get,
        create: create,
        update: update,
        remove: remove
    };
}