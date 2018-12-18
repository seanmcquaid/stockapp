$(document).ready(()=>{
    const stockForm = document.querySelector(".stock-form");
    // console.log(stockForm);
    // The DOM is done loading
    // our endpoint
    // an endpoint is a web accessible url that responds with data
    // this code will fire when the event happens on the stock form element
    $(".stock-form").submit((event)=>{
        // stop the browser from sending the form to another page
        event.preventDefault();
        // console.log(event);

        // val() is jQuery, .value is native JS
        // takes the value from the form submission
        const symbol = $("#symbol").val();
        $("#symbol").val("");
        // console.log(symbol);

        // how can we make an array out of a string based on where the , are?
        // use split
        const symbols = symbol.split(",");
        // ex for symbols = ["msft", "goog", "x"]

        symbols.forEach((s)=>{
            // gets rid of whitespace on both sides using native JS
            s = s.trim();
            const url = `https://api.iextrading.com/1.0/stock/${s}/quote`;
            // getJSON method takes 2 args:
            // 1) where to get the json
            // 2) function to run when I am back
            $.getJSON(url, (theDataJSFoundIfAny)=>{
                // append will add this html
                let changeClass = "";
                if (theDataJSFoundIfAny.change > 0) {
                    changeClass = "bg-success";
                } else {
                    changeClass = "bg-danger"
                }
                $("#stock-body").append(`
                    <tr>
                        <td>${theDataJSFoundIfAny.symbol}</td>
                        <td>${theDataJSFoundIfAny.companyName}</td>
                        <td>${theDataJSFoundIfAny.high}</td>
                        <td>${theDataJSFoundIfAny.low}</td>
                        <td class="${changeClass}">${theDataJSFoundIfAny.change}</td>
                    </tr>
                `); // end append
            }); // end getJSON
        }); // end forEach
        $('#stock-table').DataTable();
    }); // end stockform listener
});