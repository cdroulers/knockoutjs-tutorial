var Product = function (id, name, price, stock) {
    "use strict";

    var
        _id = ko.observable(id),
        _name = ko.observable(name),
        _price = ko.observable(price),
        _stock = ko.observable(stock);

    var toObj = function () {
        return {
            id: _id(),
            name: _name(),
            price: _price(),
            stock: _stock()
        };
    };

    return {
        id: _id,
        name: _name,
        price: _price,
        stock: _stock,
        toObj: toObj
    };
};