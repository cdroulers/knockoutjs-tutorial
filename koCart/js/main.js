//write this inside main.js file
require.config({
    baseUrl: 'js',
    paths: {
        bootstrap: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/js/bootstrap.min',
        icheck: 'vendor/icheck.min',
        jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
        mockjax: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mockjax/1.5.3/jquery.mockjax.min',
        mockjson: 'vendor/jquery.mockjson',
        knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min',
        'ko.validation': 'vendor/knockout.validation.min',
        'ko.amd-helpers': 'vendor/knockout-amd-helpers.min',
        text: 'https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min'
    },
    shim: {
        'jquery': {
          exports: '$'
        },
        bootstrap: {
            deps: ['jquery']
        },
        mockjax: {
            deps: ['jquery']
        },
        mockjson: {
            deps: ['jquery']
        },
        knockout: {
            exports: 'ko',
            deps: ['jquery']
        },
        'ko.validation':{
            deps: ['knockout']
        },
        'ko.templateEngine': {
            deps: ['knockout']
        }
    },
    deps: ['app']
});