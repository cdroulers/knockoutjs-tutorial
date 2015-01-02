function OrderService() {
    function all() {
        return $.ajax({
            type: 'GET',
            url: '/orders'
        });
    }

    function get(id) {
        return $.ajax({
            type: 'GET',
            url: '/orders/' + id
        });
    }

    function create(product) {
        return $.ajax({
            type: 'POST',
            url: '/orders',
            data: product
        });
    }

    function update(product) {
        return $.ajax({
            type: 'PUT',
            url: '/orders',
            data: product
        });
    }
    
    function remove(id) {
        return $.ajax({
            type: 'DELETE',
            url: '/orders/' + id
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