define(['durandal/composition', 'durandal/app', 'jquery'], function(composition, app, $) {
    var ctor = function() { };

    //generates a simple unique id  
    function guid() {
        var s4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return s4();
    }

    ctor.prototype.activate = function (settings) {
        this.settings = settings;
        
        var _settings = this.settings;//save a reference to settings
        var items = this.settings.items();//get data from observable
        
        items.forEach(function (item) {//manipulate data
            item.id = guid();
        });
        
        this.settings.items(items);//update observable with new data
        
        //listen to add event and save a reference to the listener
        this.addEvent = app.on('accordion:add').then(function (data) {
            data.id = guid();
            _settings.items.push(data);
        });
    };

    ctor.prototype.detached = function () {
        //remove the suscription 
        this.addEvent.off();
    }

    ctor.prototype.getHeaderText = function (item) {
        if (this.settings.headerProperty) {
            return item[this.settings.headerProperty];
        }

        return item.toString();
    };

    return ctor;
});