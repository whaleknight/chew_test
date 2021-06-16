const fetch = require("node-fetch");

Array(1).fill(0).forEach(() => fetch("http://localhost:5000/api/accounts/transfer", {
    method: "post",
    headers: {
        'Content-Type': 'application/json'
    }, body: JSON.stringify({
        "sourceAccountId": 2,
        "DestinationAccountId": 1,
        "transferAmount": 10.00
    })
}));