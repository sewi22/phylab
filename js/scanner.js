
    function openQrScanner(){
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan( function (result) {
            alert("Scanner result: \n" +
            "text: " + result.text + "\n" +
            "format: " + result.format + "\n" +
            "cancelled: " + result.cancelled + "\n");
            // TODO: Setze Return Werte
            //return XXX;
        },function (error) {
            console.log("Scanning failed: ", error);
        });
    }
    