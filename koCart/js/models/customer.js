var customerData = (function () {
    var firstName = ko.observable("");
    var lastName = ko.observable("");
    var fullName = ko.computed(function () {
        return firstName() + " " + lastName();
    });
    var address = ko.observable("");
    var email = ko.observable("");
    var zipCode = ko.observable("");
    var country = ko.observable("");
    var fullAddress = ko.computed(function () {
        return address() + " " + zipCode() + ", " + country();
    });

    return {
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
        address: address,
        email: email,
        zipCode: zipCode,
        country: country,
        fullAddress: fullAddress,
    };
})();