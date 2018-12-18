$(document).ready(()=>{
    const stockForm = document.querySelector(".stock-form");
    console.log(stockForm);
    // The DOM is done loading
    // our endpoint
    // an endpoint is a web accessible url that responds with data
    // this code will fire when the event happens on the stock form element
    $(".stock-form").submit((event)=>{
        // stop the browser from sending the form to another page
        event.preventDefault();
        console.log(event);

        // val() is jQuery, .value is native JS
        const symbol = $("#symbol").val();
        console.log(symbol);

        const url = `https://api.iextrading.com/1.0/stock/${symbol}/quote`;
        // getJSON method takes 2 args:
        // 1) where to get the json
        // 2) function to run when I am back
        $.getJSON(url, (theDataJSFoundIfAny)=>{
            console.log(theDataJSFoundIfAny);
            $("#stock-body").html(`
                <tr>
                    <td>${theDataJSFoundIfAny.symbol}</td>
                    <td>${theDataJSFoundIfAny.companyName}</td>
                    <td>${theDataJSFoundIfAny.high}</td>
                    <td>${theDataJSFoundIfAny.low}</td>
                    <td>${theDataJSFoundIfAny.change}</td>
                </tr>
            `)
        })
    })
});