define([
    //LIBRARIES
    'bootstrap',
    'knockout',
    'ko.amd-helpers',
    'ko.validation',

    //VIEWMODEL
    'viewmodel',

    //MOCKS
    'mocks/product',
    'mocks/order',

    //COMPONENTS
    'custom/components',

    //BINDINGS
    'custom/koBindings',

    //EVENTS
    'events/cart'
], function(bs, ko, koValidation, koAmdHelpers, ViewModel, productMocks, orderMocks, components, bindings, events) {
    //ko External Template Settings
    ko.amdTemplateEngine.defaultPath = "../views";
    ko.amdTemplateEngine.defaultSuffix = ".html";
    ko.amdTemplateEngine.defaultRequireTextPluginName = "text";
    ko.validation.init();

    //initialize components
    components.init();
    bindings.init();
    events.init();

    //Mocks
    orderMocks();
    productMocks();

    var vm = new ViewModel();
    vm.activate();
    window.vm = vm;
});