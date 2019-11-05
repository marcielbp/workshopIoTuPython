/*
https://script.google.com/macros/s/AKfycbwoCkpreAY81-IrFZbPoBo1w0t1VL0TUeo8oFaAKyVUfUIVmRQ/exec?dadoSensor=blank-valor1-valor2-valor3
*/

function doGet(e) { 
  Logger.log( JSON.stringify(e) );  // view parameters

  var result = 'Ok'; // assume success

  if (e.parameter == undefined) {
    result = 'No Parameters';
  }
  else {
    //id da planilha criada
    var id = '1Svs9BHx4fnW4Gw9dcXvWoCl6fCPrRvnaMlA-k4u9CoI';//docs.google.com/spreadsheetURL/d
    var sheet = SpreadsheetApp.openById(id).getActiveSheet();
    var newRow = sheet.getLastRow() + 1;
    var rowData = [];
    var strInput = "";
   
    for (var param in e.parameter) {
      Logger.log('In for loop, param='+param);
      var value = stripQuotes(e.parameter[param]);
      switch (param) {
        case 'dados': //Parameter
          rowData = value.split("-"); //a single input parameter
          rowData[0] = new Date(); // Timestamp in column A
          break;
        default:
          rowData[1] = "ERROR";
          //result = "unsupported parameter";
      }
    }
    Logger.log(JSON.stringify(rowData));

    // Write new row below
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }

  // Return result of operation
  return ContentService.createTextOutput(result);
}
function stripQuotes( value ) {
  return value.replace(/^["']|['"]$/g, "");
}

function stripAllData( value ) {
  return value.replace(/^["']|['"]$/g, "");
}
