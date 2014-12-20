var vm = (function () {
    "use strict";

    var product = new Product(1,"T-Shirt", 10.00, 20);

    return {
        product: product
    };
})();

ko.applyBindings(vm); //Here we link KO and the view

// Bind to global scope for debugging.
window.vm = vm;