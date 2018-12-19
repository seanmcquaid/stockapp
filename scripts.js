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
                if(theDataJSFoundIfAny.change > 0 || theDataJSFoundIfAny.change < 0){
                    // append will add this html
                    let changeClass = "";
                    if (theDataJSFoundIfAny.change > 0) {
                        changeClass = "bg-success";
                    } else {
                        changeClass = "bg-danger"
                    }
                    $("#stock-body").append(`
                        <tr id="${theDataJSFoundIfAny.symbol}">
                            <td><button id="remove" class="btn btn-danger" delRow="${theDataJSFoundIfAny.symbol}">X</button></td>
                            <td>${theDataJSFoundIfAny.symbol}</td>
                            <td>${theDataJSFoundIfAny.companyName}</td>
                            <td>${theDataJSFoundIfAny.high}</td>
                            <td>${theDataJSFoundIfAny.low}</td>
                            <td class="${changeClass}">${theDataJSFoundIfAny.change}</td>
                        </tr>
                    `); // end append
                } else{
                    alert("Type out something else!");
            }
        }); // end getJSON
        }); // end forEach
        $('#stock-table').DataTable();
    }); // end stockform listener
    $(document).on("click", "#remove", function(){
        const rowToDelete = $("#remove").attr("delRow");
        $("#" + rowToDelete).remove();
    })
});

// 1) Get different pieces of data from JSON
// 2) Inform the user that there is no price for the stock