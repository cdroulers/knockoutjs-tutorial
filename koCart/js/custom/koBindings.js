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

ko.bindingHandlers.hidden = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        var value = !ko.utils.unwrapObservable(valueAccessor());
        ko.bindingHandlers.visible.update(element, function () { return value; }, allBindingsAccessor);
    }
};

ko.bindingHandlers.icheck = {
    init: function (element, valueAccessor) {
        $(element).iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            increaseArea: '10%'
        });

        $(element).on('ifChanged', function () {
            var observable = valueAccessor();
            observable($(element)[0].checked);
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        if (value) {
            $(element).iCheck('check');
        } else {
            $(element).iCheck('uncheck');
        }
    }
};

ko.bindingHandlers.executeOnEnter = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var allBindings = allBindingsAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) {
                allBindings.executeOnEnter.call(viewModel);
                return false;
            }
            return true;
        });
    }
};