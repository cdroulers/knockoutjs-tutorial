ko.bindingHandlers.toggle = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        ko.applyBindingsToNode(element, {
            click: function () {
                value(!value());
            }
        });
    }
};

ko.bindingHandlers.currency = {
    symbol: ko.observable('$'),
    update: function (element, valueAccessor, allBindingsAccessor) {
        return ko.bindingHandlers.text.update(
            element, 
            function () {
                var value = +(ko.unwrap(valueAccessor()) || 0),
                    symbol = ko.unwrap(allBindingsAccessor().symbol !== undefined ? allBindingsAccessor().symbol : ko.bindingHandlers.currency.symbol);
                return symbol + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }, 
            allBindingsAccessor);
    }
};

ko.bindingHandlers.toJSON = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        return ko.bindingHandlers.text.update(
            element,
            function () {
                return ko.toJSON(valueAccessor(), null, 2);
            },
            allBindingsAccessor);
    }
};