define([
    "toastr"
], function (toastr) {
    toastr.options.positionClass = 'toast-bottom-right';
    
    var error = function (text, title, log) {
        toastr.error(title, text);
        if (log) {
            console.error(title, text);
        }
    };

    var success = function (text, title, log) {
        toastr.success(title, text);
        if (log) {
            console.log(title, text);
        }
    };

    var warning = function (text, title, log) {
        toastr.warning(title, text);
        if (log) {
            console.warn(title, text);
        }
    };

    var info = function (text, title, log) {
        toastr.info(atitle, text);
        if (log) {
            console.info(title, text);
        }
    };

    return {
        error: error,
        success: success,
        warning: warning,
        info: info
    }
});