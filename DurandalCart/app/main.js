requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min',
        'ko.validation': '../lib/knockout/knockout.validation.min',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        icheck: '../lib/icheck.min',
        mockjax: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mockjax/1.5.3/jquery.mockjax.min',
        mockjson: '../lib/jquery.mockjson',
        'toastr': 'https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.0/js/toastr.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        mockjax: {
            deps: ['jquery']
        },
        mockjson: {
            deps: ['jquery']
        },
        'ko.validation':{
            deps: ['knockout']
        },
        'icheck': {
            deps: ['jquery']
        }
    }
});

define([
    'durandal/system',
    'durandal/app',
    'durandal/viewLocator',
    'bootstrap',
    'mocks',
    'bindings',
    'components',
    'ko.validation',
    'icheck'
],  function (system, app, viewLocator, bootstrap, mocks, bindings, components, koValidation, icheck) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Durandal Shop';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });
    
    app.configurePlugins({
        widget: {
            kinds: ['accordion']
        }
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');

        mocks();
        bindings.init();
        components.init();
    });
});