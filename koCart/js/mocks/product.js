$.mockJSON.data.PRODUCTNAME = [
    'T-SHIRT', 'SHIRT', 'TROUSERS', 'JEANS', 'SHORTS', 'GLOVES', 'TIE'
];

var data = $.mockJSON.generateFromTemplate({
    "data|5-10": [{
        "id|1-100": 0,
        "name": "@PRODUCTNAME",
        "price|10-500": 0,
        "stock|1-9": 0
    }]
})

$.mockjax({
    url: "/products",
    type: "GET",
    dataType: "json",
    responseTime: 750,
    responseText: data
});

$.mockjax({
    url: /^\/products\/([\d]+)$/,
    type: "GET",
    dataType: "json",
    responseTime: 750,
    responseText: $.mockJSON.generateFromTemplate({
        "data": {
            "id|1-100": 0,
            "name": "@PRODUCTNAME",
            "price|10-500": 0,
            "stock|1-9": 0,
            "description": "@LOREM_IPSUM"
        }
    })
});