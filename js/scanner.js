
    function openQrScanner(){
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan( function (result) {        
            console.log("Scanner - Text: "+result.text);
            console.log("Scanner - Format: "+result.format);
            console.log("Scanner - Cancelled: "+result.cancelled);
            // TODO: Setze Return Werte
            //return XXX;
        },function (error) {
            //console.log("Scanning failed: ", error);
        });
    }
    