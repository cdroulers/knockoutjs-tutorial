define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: ['', '/', 'catalog'], title: 'Catalog', moduleId: 'viewmodels/catalog', nav: true },
                { route: 'new', title: 'New product', moduleId: 'viewmodels/new', nav: true },
                { route: 'edit/:id', title: 'Edit product', moduleId: 'viewmodels/edit', nav: false },
                { route: 'cart', title: 'Cart', moduleId: 'viewmodels/cart', nav: false },
                { route: 'order', title: 'Order', moduleId: 'viewmodels/order', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});