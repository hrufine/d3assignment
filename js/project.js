var fs = require("fs");
var csv = fs.readFileSync("../input/input.csv")

function csvJSON(csv) {
  var lines = csv.split("\r\n");
  var commercial_intermediate = [];
  var quantity = "Quantity";
  var oilseed_result = [];
  var foodgrains_result = [];
  var commercial_result = [];
  var rice_result = [];
  var stateLine = [];
  var southern = ["Karnataka", "Andhra Pradesh", "Tamil Nadu", "Kerala"];
  var southStateObj = {};
  var headers = lines[0].split(",");
  var float = 0.0;
  for (var r = 3; r < headers.length; r++) {
    headers[r] = headers[r].replace(" 3-", "");
  }
  for (var i = 1; i < lines.length - 1; i++) {
    var currentline = lines[i].split(",");
    if (currentline[0].indexOf("Agricultural Production Foodgrains Rice Volume ") != -1) {
      var currentState = currentline[0].replace("Agricultural Production Foodgrains Rice Volume", "").trim();


      if (southern.indexOf(currentState) > -1) {
        lines[i] = lines[i].replace("Annual,", "Annual");
        lines[i] = lines[i].replace("\"Annual Ending mar Of Each Year\"", "Annual Ending mar Of Each Year");
        southStateObj[currentState] = currentline;
      }
    }

    if (currentline[0].indexOf("Oilseeds ") != -1) {
      if (currentline[0].indexOf("Agricultural Production Oilseeds Kharif") == -1) {
        if (currentline[0].indexOf("Agricultural Production Oilseeds Rabi") == -1) {
          if (currentline[0].indexOf("Oilseeds Nine ") == -1) {
            var oilseed_obj = {};
            lines[i] = lines[i].replace("Annual,", "Annual");
            lines[i] = lines[i].replace("\"Annual Ending mar Of Each Year\"", "Annual Ending mar Of Each Year");
            currentline[0] = currentline[0].replace("Agricultural Production Oilseeds", "")
            oilseed_obj[headers[0]] = currentline[0];
            oilseed_obj[quantity.trim()] = currentline[23].trim();
            oilseed_result.push(oilseed_obj);
          }
        }
      }
    }
    if (currentline[0].indexOf("Commercial") != -1) {
      lines[i] = lines[i].replace("Annual,", "Annual");
      lines[i] = lines[i].replace("\"Annual Ending mar Of Each Year\"", "Annual Ending mar Of Each Year");
      var commercial_obj = {};
      for (var z = 3; z < headers.length; z++) {
        if (currentline[z] == "NA") {
          currentline[z] = 0;
        }
        currentline[z] = parseFloat(currentline[z]);
        commercial_obj[headers[z]] = currentline[z];
      }
      commercial_intermediate.push(commercial_obj);
    }
  }


  for (h in headers) {
    if (h > 3) {
      var southArray = {};
      southArray["Year"] = headers[h];
      for (g in southStateObj) {
        if (southStateObj[g][h] == "NA")
          southStateObj[g][h] = 0;
        southArray[g] = southStateObj[g][h];
      }
      rice_result.push(southArray);
    }
  }
  for (var m = 5; m < 31; m++) {
    var foodgrains_obj = {};
    currentline = lines[m].split(",");
    currentline[0] = currentline[0].replace("Agricultural Production Foodgrains ", "");
    foodgrains_obj[headers[0]] = currentline[0];
    foodgrains_obj[quantity.trim()] = currentline[23].trim();
    foodgrains_result.push(foodgrains_obj);
  }
  var agg = {}
  for (k = 3; k < headers.length; k++) {
    agg[headers[k]] = 0;
  }
  for (m = 0; m < commercial_intermediate.length; m++) {
    for (j in commercial_intermediate[m]) {
      agg[j] += commercial_intermediate[m][j];
    }
  }
  var year = "Year";
  var sum = "Quantity";
  var agg1 = {};
  for (j in agg) {
    agg1 = new Object();
    agg1[year] = j;
    agg1[sum] = agg[j];
    commercial_result.push(agg1);
  }
  fs = require('fs');
  fs.writeFile('../json/oilseed_result.json', JSON.stringify(oilseed_result).replace(/\\n|\\/g, ''), function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("genarated");
  });
  fs.writeFile('../json/foodgrains_result.json', JSON.stringify(foodgrains_result).replace(/\\n|\\/g, ''), function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("genarated");
  });
  fs.writeFile('../json/commercial_result.json', JSON.stringify(commercial_result).replace(/\\n|\\/g, ''), function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("genarated");
  });
  fs.writeFile('../json/rice_result.json', JSON.stringify(rice_result).replace(/\\n|\\/g, ''), function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log("genarated");
  });
}
var json = csvJSON(csv.toString());
