$.mockjax({
    type: 'POST',
    url: '/order',
    responseTime: 750,
    responseText: {
        "data": {
            result: "true",
            text: "Order created"
        }
    }
});