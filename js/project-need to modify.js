var fs=require("fs");
var csv = fs.readFileSync("../input/input.csv")

function csvJSON(csv){
//console.log(typeof csv);
  var lines=csv.split("\n");
  var lines=csv.split("\r");
  var commercial_intermediate=[];
    var quantity="Quantity";
  var result = [];
  var rice_array=[];
  var oilseed_result=[];
  var foodgrains_result=[];
  var commercial_result=[];
  var rice_result=[];
  var rice_result_change=[];
  var rice_row={};
  var flag_rice=0;
  var state = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
"Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand",
"Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya",
"Mizoram","Nagaland","Orissa","Punjab","Rajasthan","Sikkim","Tamil Nadu",
"Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal", "Uttaranchal",
"Union Territories"];

  var tn="Tamil Nadu";
  var ka="Karnataka";
  var kl="Kerala";
  var ap="Andhra Pradesh";




  var headers=lines[0].split(",");
  var float=0.0;
  for(var r=3;r<headers.length;r++)
  {
    headers[r]=headers[r].replace(" 3-","");
  }

  for(var i=1;i<lines.length-1;i++){

	//  var obj = {};
    var oilseed_obj={};

    var commercial_obj={};


    lines[i]=lines[i].replace("Annual,","Annual");
    lines[i]=lines[i].replace("\"Annual Ending mar Of Each Year\"","Annual Ending mar Of Each Year");
	  var currentline=lines[i].split(",");


//*********************Problem statement 4 ********************************************************88
   if ((currentline[0].indexOf("Agricultural Production Foodgrains Rice Volume Andhra Pradesh")!=-1)||(currentline[0].indexOf("Agricultural Production Foodgrains Rice Volume Karnataka")!=-1)||(currentline[0].indexOf("Agricultural Production Foodgrains Rice Volume Kerala")!=-1)||(currentline[0].indexOf("Agricultural Production Foodgrains Rice Volume Tamil Nadu")!=-1))
{

  var  rice_volume_obj={};
             currentline[0]=currentline[0].replace("Agricultural Production Foodgrains Rice Volume Andhra Pradesh","Andhra Pradesh");
             currentline[0]=currentline[0].replace("Agricultural Production Foodgrains Rice Volume Kerala","Kerala");
             currentline[0]=currentline[0].replace("Agricultural Production Foodgrains Rice Volume Tamil Nadu","Tamil Nadu");
             currentline[0]=currentline[0].replace("Agricultural Production Foodgrains Rice Volume Karnataka","Karnataka");
             currentline[0]=currentline[0].trim();

              if(flag_rice==0)
              {
            for(var z=3;z<headers.length;z++)
            {
                 rice_obj=new Object();
                rice_obj["Year"]=headers[z];
                rice_obj[ap]=0;
                rice_obj[ka]=0;
                rice_obj[kl]=0;
                rice_obj[tn]=0;

                  rice_result.push(rice_obj);

                 flag_rice=1;


              }
            }
            function Rice(state)

              {
                var y=0;
                for(t=3;t<headers.length;t++)
                {
                  if(currentline[t]=="NA")
                  {

                    currentline[t]=0;


                  }

                  rice_result[y][state]=currentline[t];


                  y=y+1;

                }

            }
            if(currentline[0]=="Andhra Pradesh")
            {

              Rice(ap);

            }
            if(currentline[0]=="Kerala")
            {
              Rice(kl);

            }
            if(currentline[0]=="Karnataka")
            {
              Rice(ka);

            }
            if(currentline[0]=="Tamil Nadu")
            {
              Rice(tn);

            }

            }

//********************end of problem statement 4 *********************************

//**************Problem statement 1.b *****************************************
    if (currentline[0].indexOf("Agricultural Production Foodgrains ")!=-1)
    {
    if(currentline[0].indexOf("Agricultural Production Foodgrains Kharif")==-1)
    {
    if(currentline[0].indexOf("Agricultural Production Foodgrains Rabi")==-1)
    {
    if(containsState(currentline[0])==false)
    {
      var foodgrains_obj={};
      currentline[0]=currentline[0].replace("Agricultural Production Foodgrains","")
  		   foodgrains_obj[headers[0]] = currentline[0];
         foodgrains_obj[quantity.trim()] = currentline[23].trim();
  	     foodgrains_result.push(foodgrains_obj);

    }
  }
}
}

    // && (arr[0] != "Agricultural Production Foodgrains Kharif")
    // && (arr[0] != "Agricultural Production Foodgrains Rabi") && !containsState(currentline[0]))
    //       {
    //         var foodgrains_obj={};
    //  currentline[0]=currentline[0].replace("Agricultural Production Foodgrains","")
		//   foodgrains_obj[headers[0]] = currentline[0];
    //   foodgrains_obj[quantity.trim()] = currentline[23].trim();
	  //   foodgrains_result.push(foodgrains_obj);
    // }

//*********************end of problem statement 1.b ******************************8

//**************Problem statement 1.a *****************************************
    if (currentline[0].indexOf("Oilseeds ")!=-1)
      {
      if(currentline[0].indexOf("Agricultural Production Oilseeds Kharif")==-1)
       {
      if(currentline[0].indexOf("Agricultural Production Oilseeds Rabi")==-1)
      {
        if(currentline[0].indexOf("Oilseeds Nine ")==-1)


    {
     currentline[0]=currentline[0].replace("Agricultural Production Oilseeds","")
		  oilseed_obj[headers[0]] = currentline[0];
      oilseed_obj[quantity.trim()] = currentline[23].trim();
	    oilseed_result.push(oilseed_obj);
    }
  }
  }
}

//******************************************************************************//
//********************Problem statement 3 ******************************//
    if (currentline[0].indexOf("Commercial")!=-1){
          for(var z=3;z<headers.length;z++)
          {
                if(currentline[z]=="NA")
                  {
                    currentline[z]=0;
                }
                  currentline[z]=parseFloat(currentline[z]);
                  commercial_obj[headers[z]] = currentline[z];
          }
           commercial_intermediate.push(commercial_obj);
        }


//***************************food grains********************************************




//**********************end food grain ********************************************8
}

//************************end of problem statement 3 ************************//
//***************************************************************************//
function containsState(str) {
  for(p in state) {
    if(str.indexOf(state[p]) > -1) {
      return true;
    }
  }
  return false;
}



// for(var m=5;m<31;m++){
//   var foodgrains_obj={};
//   currentline=lines[m].split(",");
//   //console.log(currentline[0]);
//   currentline[0]=currentline[0].replace("Agricultural Production Foodgrains ","");
//   foodgrains_obj[headers[0]] = currentline[0];
//   foodgrains_obj[quantity.trim()] = currentline[23].trim();
//   foodgrains_result.push(foodgrains_obj);
//
// }




var agg={}
for(k=3;k<headers.length;k++){

  agg[headers[k]]=0;
}
for(m=0;m<commercial_intermediate.length;m++){
 for(j in commercial_intermediate[m]){
   agg[j]+=commercial_intermediate[m][j];
 }
}

var year="Year";
var sum="Quantity";
var agg1={};
for(j in agg)
{  agg1=new Object();
  agg1[year]=j;
  agg1[sum]=agg[j];
commercial_result.push(agg1);

}



 fs = require('fs');


 fs.writeFile('../json/oilseed_result.json', JSON.stringify(oilseed_result).replace(/\\n|\\/g, ''), function (err,data) {
   if (err) {
     return console.log(err);
   }
   console.log("genarated");
 });

 fs.writeFile('../json/foodgrains_result.json', JSON.stringify(foodgrains_result).replace(/\\n|\\/g, ''), function (err,data) {
   if (err) {
     return console.log(err);
   }
   console.log("genarated");
 });

 fs.writeFile('../json/commercial_result.json', JSON.stringify(commercial_result).replace(/\\n|\\/g, ''), function (err,data) {
   if (err) {
     return console.log(err);
   }
   console.log("genarated");
 });

 fs.writeFile('../json/rice_result.json', JSON.stringify(rice_result).replace(/\\n|\\/g, ''), function (err,data) {
   if (err) {
     return console.log(err);
   }
   console.log("genarated");
 });



}
var json=csvJSON(csv.toString());
